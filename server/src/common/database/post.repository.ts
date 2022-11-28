import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../database/post.schema';
import mongoose, { Model, FilterQuery } from 'mongoose';
import { CreatePostDto } from '../../post/dto/create-post.dto';
import { User } from 'src/common/database/user.schema';
import { FollowerPostDto } from 'src/post/dto/follower-post.dto';

@Injectable()
export class PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async find(postFilterQuery: FilterQuery<Post>): Promise<Post[]> {
    return this.postModel.find(postFilterQuery).sort({ createdAt: -1 });
  }

  async findOne(postFilterQuery: FilterQuery<Post>) {
    const { _id } = postFilterQuery;
    const postOne = await this.postModel.aggregate([
      { $match: { $expr: { $eq: ['$_id', { $toObjectId: _id }] } } },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: 'userid',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          author: '$author',
          title: '$title',
          description: '$description',
          createdAt: '$createdAt',
          updatedAt: '$updateAt',
          authorDetail: {
            nickname: '$user.nickname',
            email: '$user.email',
            profileimg: '$user.profileimg',
            bio: '$user.bio',
            userState: '$user.state',
            following: '$user.following',
            postcount: '$user.postcount',
            follower: '$user.follower',
          },
        },
      },
    ]);
    return postOne.at(0);
  }

  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const { title, description } = createPostDto;
    const newPost = new this.postModel({
      title,
      description: description,
      author: user.userid,
    });

    return newPost.save();
  }

  async findOneAndUpdate(
    postFilterQuery: FilterQuery<Post>,
    post: Partial<Post>,
  ): Promise<Post> {
    const result = await this.postModel.findOneAndUpdate(postFilterQuery, post);
    if (!result) throw new NotFoundException();
    return result;
  }

  async deleteOne(boardFilterQuery: FilterQuery<Post>): Promise<number> {
    const result = await this.postModel.deleteOne(boardFilterQuery);
    //{ acknowledged: true, deletedCount: 1 }
    if (result.deletedCount === 0) throw new NotFoundException();
    return result.deletedCount;
  }

  async getUserPostsWithNext(
    authorid: string,
    followerPostDTO: FollowerPostDto,
  ): Promise<{ post: Post[]; next: string }> {
    const { next, limit } = followerPostDTO;
    const res = { post: [], next: '' };
    const postList =
      (await this.postModel.aggregate([
        {
          $match: {
            $and: [
              { author: authorid },
              { _id: { $lt: new mongoose.Types.ObjectId(next) } },
            ],
          },
        },
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
        { $sort: { _id: -1 } },
        { $limit: limit },
      ])) ?? [];
    res.post = postList;
    res.next = postList.length === limit ? postList.at(-1)._id : '';
    return res;
  }
  async getUserPosts(
    authorid: string,
    followerPostDTO: FollowerPostDto,
  ): Promise<{ post: Post[]; next: string }> {
    const { limit } = followerPostDTO;
    const res = { post: [], next: '' };
    const postList =
      (await this.postModel.aggregate([
        {
          $match: {
            $and: [{ author: authorid }],
          },
        },
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
        { $sort: { _id: -1 } },
        { $limit: limit },
      ])) ?? [];
    res.post = postList;
    res.next = postList.length === limit ? postList.at(-1)._id : '';
    return res;
  }
}
