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
import { FollowListDto } from 'src/follow/dto/follow-list.dto';
import {
  FOLLOWER_LIST_LIMIT,
  FOLLOWING_LIST_LIMIT,
} from '../constants/pagination.constants';
@Injectable()
export class FollowRepository {
  constructor(
    @InjectModel(Follow.name) private followModel: Model<FollowDocument>, // @InjectModel(Post.name) private PostModel: Model<PostDocument>,
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

  async findFollowers({ targetid }) {
    const dataList =
      (await this.followModel.aggregate([
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
            ],
            as: 'followerlist',
          },
        },
        { $limit: FOLLOWER_LIST_LIMIT },
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
    res['next'] =
      dataList.length === FOLLOWER_LIST_LIMIT ? dataList.at(-1)._id : '';
    return res;
  }
  async findFollowersWithNext({ targetid }, followListDTO: FollowListDto) {
    const { next } = followListDTO;
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
        { $limit: FOLLOWER_LIST_LIMIT },
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
    res['next'] =
      dataList.length === FOLLOWER_LIST_LIMIT ? dataList.at(-1)._id : '';
    return res;
  }

  async findFollowing({ userid }) {
    const dataList =
      (await this.followModel.aggregate([
        {
          $match: { userid: userid },
        },
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
        { $limit: FOLLOWING_LIST_LIMIT },
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
    res['next'] =
      dataList.length === FOLLOWING_LIST_LIMIT ? dataList.at(-1)._id : '';
    return res;
  }
  async findFollowingWithNext({ userid }, followListDTO: FollowListDto) {
    const { next } = followListDTO;
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
        { $limit: FOLLOWING_LIST_LIMIT },
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
    res['next'] =
      dataList.length === FOLLOWING_LIST_LIMIT ? dataList.at(-1)._id : '';
    return res;
  }

  async getFollowingUsersList(userid: string) {
    return (
      await this.followModel.find({ userid }, { targetid: 1 }).lean()
    ).map((v) => v.targetid);
  }

  async findUserToMention(userid: string) {
    const userSet = new Set<string>();
    const followingProms = this.followModel
      .find({ userid: userid })
      .lean()
      .then(
        (list) =>
          new Promise<void>((resolve) => {
            list.forEach((v) => userSet.add(v.targetid));
            resolve();
          }),
      );

    const followerProms = this.followModel
      .find({ targetid: userid })
      .lean()
      .then(
        (list) =>
          new Promise<void>((resolve) => {
            list.forEach((v) => userSet.add(v.userid));
            resolve();
          }),
      );

    await Promise.all([followingProms, followerProms]);

    const finalList = [...userSet];
    return finalList;
  }
}
