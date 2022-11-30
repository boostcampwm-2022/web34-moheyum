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
          description: '$description',
          parentPost: '$parentPost',
          childPosts: '$childPosts',
          createdAt: '$createdAt',
          updatedAt: '$updateAt',
          authorDetail: {
            nickname: '$user.nickname',
            profileimg: '$user.profileimg',
          },
        },
      },
    ]);
    const data = postOne.at(0);
    if (data.parentPost !== '') {
      // const parent = await this.postModel.findById(data.parentPost);
      const parent = await this.postModel.aggregate([
        {
          $match: {
            $expr: { $eq: ['$_id', { $toObjectId: data.parentPost }] },
          },
        },
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
            description: '$description',
            childPosts: { $size: '$childPosts' },
            createdAt: '$createdAt',
            updatedAt: '$updateAt',
            authorDetail: {
              nickname: '$user.nickname',
              profileimg: '$user.profileimg',
            },
          },
        },
      ]);
      data.parent = parent;
    }
    return data;
  }

  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const { description, parentPost } = createPostDto;
    let parent: Post | null;
    if (parentPost !== '') {
      parent = await this.postModel.findById(parentPost);
    }
    const newPost = new this.postModel({
      description: description,
      parentPost: parentPost,
      author: user.userid,
    });

    if (parent) {
      parent.childPosts.push(newPost._id.toString());
      await this.postModel.updateOne(
        { _id: parentPost },
        { $set: { childPosts: parent.childPosts } },
      );
    }

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
        { $sort: { _id: -1 } },
        { $limit: limit },
      ])) ?? [];
    res.post = postList;
    res.next = postList.length === limit ? postList.at(-1)._id : '';
    return res;
  }

  async getCommentsWithNext(id: string, followerPostDTO: FollowerPostDto) {
    const { limit, next } = followerPostDTO;
    const res = { post: [], next: '' };
    const comments =
      (await this.postModel.aggregate([
        { $sort: { _id: 1 } },
        {
          $match: {
            $expr: {
              $and: [
                { $gt: ['$_id', { $toObjectId: next }] },
                { $eq: ['$parentPost', id] },
              ],
            },
          },
        },
        { $limit: limit },
        {
          $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: 'userid',
            as: 'user',
          },
        },
        { $unwind: '$user' },
        {
          $project: {
            author: '$author',
            title: '$title',
            description: '$description',
            createdAt: '$createdAt',
            updatedAt: '$updateAt',
            parentPost: '$parentPost',
            childPosts: { $size: '$childPosts' },
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
      ])) ?? [];
    res.post = comments;
    res.next = comments.length === limit ? comments.at(-1)._id.toString() : '';
    return res;
  }
  async getComments(id: string, followerPostDTO: FollowerPostDto) {
    const { limit } = followerPostDTO;
    const res = { post: [], next: '' };
    const comments =
      (await this.postModel.aggregate([
        { $sort: { _id: 1 } },
        {
          $match: {
            $expr: { $eq: ['$parentPost', id] },
          },
        },
        { $limit: limit },
        {
          $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: 'userid',
            as: 'user',
          },
        },
        { $unwind: '$user' },
        {
          $project: {
            author: '$author',
            title: '$title',
            description: '$description',
            createdAt: '$createdAt',
            updatedAt: '$updateAt',
            parentPost: '$parentPost',
            childPosts: { $size: '$childPosts' },
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
      ])) ?? [];
    res.post = comments;
    res.next = comments.length === limit ? comments.at(-1)._id.toString() : '';
    return res;
  }

  searchPost(keyword: string){
    return this.postModel.aggregate([
      {$match: { $text: {$search: keyword}}},
      {$sort: {_id: -1}},
      {$limit: 10},
      {$lookup: {
        from: 'users',
        localField: 'author',
        foreignField: 'userid',
        as: 'user'
      }},
      {$unwind: {path: '$user'}},
      {$set: {authorDetail: {
        nickname: '$user.nickname',
        profileimg: '$user.profileimg',
        state: '$user.state'
      }}},
      {$unset: "user"}
    ])
  }

  searchPostWithNext(keyword: string, next: string) {
    return this.postModel.aggregate([
      {$match: { _id: {$lt: next}, $text: {$search: keyword}}},
      {$limit: 10},
      {$sort: {_id: -1}},
      {$lookup: {
        from: 'users',
        localField: 'author',
        foreignField: 'userid',
        as: 'user'
      }},
      {$unwind: {path: '$user'}},
      {$set: {authorDetail: {
        nickname: '$user.nickname',
        profileimg: '$user.profileimg',
        state: '$user.state'
      }}},
      {$unset: "user"}
    ])
  }
}
