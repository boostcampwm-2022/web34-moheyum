import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Follow, FollowDocument } from './follow.schema';
import mongoose, { Model, FilterQuery } from 'mongoose';
import { User } from './user.schema';
import { FollowerPostDto } from 'src/post/dto/follower-post.dto';
import { FollowListDto } from 'src/follow/dto/follow-list.dto';
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

  async findFollowers({ targetid }, followListDTO: FollowListDto) {
    const { limit } = followListDTO;
    const dataList =
      (await this.followModel.aggregate([
        {
          $match: { targetid: targetid },
        },
        { $limit: limit },
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
      ])) ?? [];
    const res = {};
    res['post'] = dataList;
    res['next'] = dataList.length === this.limitData ? dataList.at(-1)._id : '';
    return res;
  }
  async findFollowersWithNext({ targetid }, followListDTO: FollowListDto) {
    const { next, limit } = followListDTO;
    const dataList =
      (await this.followModel.aggregate([
        {
          $match: {
            $and: [
              { targetid: targetid },
              { _id: { $gt: new mongoose.Types.ObjectId(next) } },
            ],
          },
        },
        { $limit: limit },
        {
          $lookup: {
            from: 'users',
            localField: 'userid',
            foreignField: 'userid',
            as: 'followerlist',
            pipeline: [
              {
                $match: {
                  state: true,
                },
              },
            ],
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
      ])) ?? [];
    const res = {};
    res['post'] = dataList;
    res['next'] = dataList.length === this.limitData ? dataList.at(-1)._id : '';
    return res;
  }

  async findFollowing({ userid }, followListDTO: FollowListDto) {
    const { limit } = followListDTO;

    const dataList =
      (await this.followModel.aggregate([
        {
          $match: { userid: userid },
        },
        { $limit: limit },
        {
          $lookup: {
            from: 'users',
            localField: 'targetid',
            foreignField: 'userid',
            as: 'followinglist',
            pipeline: [
              {
                $match: {
                  state: true,
                },
              },
            ],
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
      ])) ?? [];
    const res = {};
    res['post'] = dataList;
    res['next'] = dataList.length === this.limitData ? dataList.at(-1)._id : '';
    return res;
  }
  async findFollowingWithNext({ userid }, followListDTO: FollowListDto) {
    const { next, limit } = followListDTO;
    const dataList =
      (await this.followModel.aggregate([
        {
          $match: {
            $and: [
              { userid: userid },
              { _id: { $gt: new mongoose.Types.ObjectId(next) } },
            ],
          },
        },
        { $limit: limit },
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
      ])) ?? [];
    const res = {};
    res['post'] = dataList;
    res['next'] = dataList.length === this.limitData ? dataList.at(-1)._id : '';
    return res;
  }

  async getFollowingPostListWithoutNext(
    userid: string,
    followerPostDTO: FollowerPostDto,
  ) {
    const { limit } = followerPostDTO;
    const postList =
      (await this.followModel.aggregate([
        {
          $match: { userid: userid },
        },
        {
          $lookup: {
            from: 'posts',
            localField: 'targetid',
            foreignField: 'author',
            as: 'author',
          },
        },
        {
          $unwind: '$author',
        }, //이후 skip, limit추가
        {
          $sort: { 'author.createdAt': -1, 'author._id': -1 },
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
            author: {
              author: '$author.author',
              childPosts: { $size: '$author.childPosts' },
              createdAt: '$author.createdAt',
              description: '$author.description',
              title: '$author.title',
              updatedAt: '$author.updatedAt',
              _id: '$author._id',
            },
            profileimg: '$userinfo.profileimg',
            nickname: '$userinfo.nickname',
            cc: {
              $dateToString: {
                format: '%Y-%m-%d %H:%M:%S',
                date: '$author.createdAt',
                timezone: 'Asia/Seoul',
              },
            },
          },
        },
      ])) ?? [];
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

  async getFollowingPostList(userid: string, followerPostDTO: FollowerPostDto) {
    const { limit, next } = followerPostDTO;
    const [nextdate, nextid] = next.split('_');
    const postList =
      (await this.followModel.aggregate([
        {
          $match: { userid: userid },
        },
        {
          $lookup: {
            from: 'posts',
            localField: 'targetid',
            foreignField: 'author',
            as: 'author',
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
                'author._id': { $lt: new mongoose.Types.ObjectId(nextid) },
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
            author: {
              author: '$author.author',
              childPosts: { $size: '$author.childPosts' },
              createdAt: '$author.createdAt',
              description: '$author.description',
              title: '$author.title',
              updatedAt: '$author.updatedAt',
              _id: '$author._id',
            },
            profileimg: '$userinfo.profileimg',
            nickname: '$userinfo.nickname',
          },
        },
        // ])) ?? [];
      ])) ?? [];
    // .explain()) ?? [];
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
