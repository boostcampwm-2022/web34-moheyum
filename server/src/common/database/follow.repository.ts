import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Follow, FollowDocument } from './follow.schema';
import { Model, FilterQuery } from 'mongoose';
import { User } from './user.schema';
import { FollowerPostDto } from 'src/post/dto/follower-post.dto';
@Injectable()
export class FollowRepository {
  limitData = 2;
  constructor(
    @InjectModel(Follow.name) private followModel: Model<FollowDocument>,
  ) {}
  async create(targetid: string, user: User) {
    const newFollow = await this.followModel.updateOne(
      { userid: user.userid, targetid },
      { userid: user.userid, targetid },
      { upsert: true },
    );
    if (newFollow.matchedCount > 0) throw new ConflictException();
    try {
      return newFollow.upsertedCount;
    } catch (error) {
      if (error.code === 11000) throw new ConflictException();
      else {
        console.error(error);
        throw new InternalServerErrorException();
      }
    }
  }
  async delete(followFilterQuery: FilterQuery<Follow>): Promise<number> {
    const result = await this.followModel.deleteOne(followFilterQuery);
    if (result.deletedCount === 0) throw new NotFoundException();
    return result.deletedCount;
  }

  async check(followFilterQuery: FilterQuery<Follow>): Promise<boolean> {
    const follow = await this.followModel.find(followFilterQuery);
    if (follow.length) {
      return true;
    }
    return false;
  }

  async findFollowers({ targetid }, page: number) {
    const dataList = await this.followModel.aggregate([
      {
        $match: { targetid: targetid },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userid',
          foreignField: 'userid',
          pipeline: [
            {
              $match: {
                state: true,
              },
            },
            { $skip: page * this.limitData },
            { $limit: this.limitData },
          ],
          as: 'followerlist',
        },
      },
      {
        $unwind: '$followerlist',
      },
      {
        $project: {
          userid: 1,
          targetid: 1,
          profileimg: '$followerlist.profileimg',
          nickname: '$followerlist.nickname',
        },
      },
      { $addFields: { nextpage: page + 1 } },
    ]);
    if (dataList.length === 0) return [];
    return dataList;
  }

  async findFollowing({ userid }, page: number) {
    const dataList = await this.followModel.aggregate([
      {
        $match: { userid: userid },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'targetid',
          foreignField: 'userid',
          pipeline: [
            {
              $match: {
                state: true,
              },
            },
            { $skip: page * this.limitData },
            { $limit: this.limitData },
          ],
          as: 'followinglist',
        },
      },
      {
        $unwind: '$followinglist',
      },
      {
        $project: {
          userid: 1,
          targetid: 1,
          profileimg: '$followinglist.profileimg',
          nickname: '$followinglist.nickname',
        },
      },
      { $addFields: { nextpage: page + 1 } },
    ]);
    if (dataList.length === 0) return [];
    return dataList;
  }

  async getFollowingPostList(userid: string, followerPostDTO: FollowerPostDto) {
    const { limit, next } = followerPostDTO;
    const [nextdate, nextid] = next.split('_');
    const postList =
      (await this.followModel
        .aggregate([
          {
            $match: { userid: userid },
          },
          {
            $lookup: {
              from: 'posts',
              localField: 'targetid',
              foreignField: 'author',
              as: 'author',
              pipeline: [
                {
                  $addFields: {
                    createdKoreaAt: {
                      $dateToString: {
                        format: '%Y-%m-%d %H:%M:%S',
                        date: '$createdAt',
                        timezone: 'Asia/Seoul',
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            $unwind: '$author',
          }, //이후 skip, limit추가
          {
            $match: {
              $or: [
                {
                  'author.createdAt': { $lt: new Date(nextdate) },
                },
                {
                  'author.createdAt': new Date(nextdate),
                  'author._id': { $lt: { $toObjectId: nextid } },
                },
              ],
            },
          },
          {
            $sort: { 'author._id': -1 },
          },
          {
            $limit: limit,
          },
          {
            $lookup: {
              from: 'users',
              localField: 'targetid',
              foreignField: 'userid',
              as: 'userinfo',
            },
          },
          {
            $project: {
              author: 1,
              profileimg: '$userinfo.profileimg',
              nickname: '$userinfo.nickname',
            },
          },
          // ])) ?? [];
        ])
        .explain()) ?? [];
    const res = {};
    res['post'] = postList;
    if (postList.length === limit) {
      const lastItem = postList.at(-1);
      const next = `${lastItem.author.createdAt.toISOString()}_${
        lastItem.author._id
      }`;
      res['next'] = next;
    } else {
      res['next'] = '';
    }
    return res;
  }
}
