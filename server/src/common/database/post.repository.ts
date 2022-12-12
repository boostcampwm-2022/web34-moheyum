import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../database/post.schema';
import mongoose, { Model, FilterQuery } from 'mongoose';
import { CreatePostDto } from '../../post/dto/create-post.dto';
import { User } from 'src/common/database/user.schema';
import { FollowerPostDto } from 'src/post/dto/follower-post.dto';
import { SearchPostListDto } from 'src/post/dto/search-post-list.dto';
import { PostException } from '../exeception/post.exception';

@Injectable()
export class PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async find(postFilterQuery: FilterQuery<Post>): Promise<Post[]> {
    return this.postModel.find(postFilterQuery).sort({ createdAt: -1 });
  }

  async findOne(postFilterQuery: FilterQuery<Post>) {
    const { _id } = postFilterQuery;
    const postOne = await this.postModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(_id) } },
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
        $set: {
          authorDetail: {
            nickname: '$user.nickname',
            profileimg: '$user.profileimg',
            userid: '$user.userid',
            state: '$user.state',
          },
        },
      },
      {
        $unset: 'user',
      },
    ]);
    if (postOne.length === 0) throw PostException.postNotFound();

    const data = postOne.at(0);
    if (data.parentPost !== '') {
      // const parent = await this.postModel.findById(data.parentPost);
      const parent = await this.postModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(data.parentPost),
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
          $set: {
            childPosts: { $size: '$childPosts' },
            authorDetail: {
              nickname: '$user.nickname',
              profileimg: '$user.profileimg',
              userid: '$user.userid',
              state: '$user.state',
            },
          },
        },
        {
          $unset: 'user',
        },
      ]);
      data.parent = parent;
    }
    return data;
  }

  async create(
    createPostDto: CreatePostDto,
    user: User,
  ): Promise<PostDocument> {
    const { description, parentPost } = createPostDto;
    let parent: Post | null;
    if (parentPost !== '') {
      parent = await this.postModel.findById(parentPost);
    }
    const newPost = new this.postModel({
      description: description,
      parentPost: parent ? parentPost : '',
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

  async findAndDelete(boardFilterQuery: FilterQuery<Post>) {
    const result = await this.postModel.findOneAndDelete(
      boardFilterQuery,
      boardFilterQuery,
    );
    if (result && result.parentPost) {
      await this.postModel.updateOne(
        { _id: result.parentPost },
        {
          $pull: { childPosts: result._id.toString() },
        },
      );
    }
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
            author: authorid,
            _id: { $lt: new mongoose.Types.ObjectId(next) },
          },
        },
        { $sort: { _id: -1 } },
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
          $set: {
            childPosts: { $size: '$childPosts' },
            authorDetail: {
              nickname: '$user.nickname',
              profileimg: '$user.profileimg',
              userid: '$user.userid',
              state: '$user.state',
            },
          },
        },
        {
          $unset: 'user',
        },
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
            author: authorid,
          },
        },
        { $sort: { _id: -1 } },
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
          $set: {
            childPosts: { $size: '$childPosts' },
            authorDetail: {
              nickname: '$user.nickname',
              profileimg: '$user.profileimg',
              userid: '$user.userid',
              state: '$user.state',
            },
          },
        },
        {
          $unset: 'user',
        },
      ])) ?? [];
    res.post = postList;
    res.next = postList.length === limit ? postList.at(-1)._id : '';
    return res;
  }

  async getCommentsWithNext(id: string, followerPostDTO: FollowerPostDto) {
    const { limit, next } = followerPostDTO;
    const res = { post: [], next: '' };
    const commentIds = [];
    let idx = -1;

    (await this.postModel.findById(id)).childPosts.map((v) => {
      if (idx !== -1 && idx < limit) {
        idx += 1;
        commentIds.push(new mongoose.Types.ObjectId(v));
      }
      if (v === next) idx = 0;
    });

    const comments = await this.postModel.aggregate([
      {
        $match: {
          _id: { $in: commentIds, $gt: new mongoose.Types.ObjectId(next) },
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
      { $unwind: '$user' },
      {
        $set: {
          childPosts: { $size: '$childPosts' },
          authorDetail: {
            nickname: '$user.nickname',
            profileimg: '$user.profileimg',
            userid: '$user.userid',
            state: '$user.state',
          },
        },
      },
      { $unset: 'user' },
    ]);

    res.post = comments;
    res.next = comments.length === limit ? comments.at(-1)._id.toString() : '';
    return res;
  }

  async getComments(id: string, followerPostDTO: FollowerPostDto) {
    const { limit } = followerPostDTO;
    const res = { post: [], next: '' };
    const commentIds = [];
    let idx = 0;
    (await this.postModel.findById(id)).childPosts.map((v) => {
      if (idx < limit) {
        idx += 1;
        commentIds.push(new mongoose.Types.ObjectId(v));
      }
    });

    const comments = await this.postModel.aggregate([
      { $match: { _id: { $in: commentIds } } },
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
        $set: {
          childPosts: { $size: '$childPosts' },
          authorDetail: {
            nickname: '$user.nickname',
            profileimg: '$user.profileimg',
            userid: '$user.userid',
            state: '$user.state',
          },
        },
      },
      { $unset: 'user' },
    ]);

    res.post = comments;
    res.next = comments.length === limit ? comments.at(-1)._id.toString() : '';
    return res;
  }

  searchPost(searchPostListDto: SearchPostListDto) {
    return this.postModel.aggregate([
      { $match: { $text: { $search: searchPostListDto.keyword } } },
      { $sort: { _id: -1 } },
      { $limit: searchPostListDto.limit },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: 'userid',
          as: 'user',
        },
      },
      { $unwind: { path: '$user' } },
      {
        $set: {
          authorDetail: {
            nickname: '$user.nickname',
            profileimg: '$user.profileimg',
            userid: '$user.userid',
            state: '$user.state',
          },
        },
      },
      { $unset: 'user' },
    ]);
  }

  searchPostWithNext(searchPostListDto: SearchPostListDto) {
    return this.postModel.aggregate([
      {
        $match: {
          _id: { $lt: new mongoose.Types.ObjectId(searchPostListDto.next) },
          $text: { $search: searchPostListDto.keyword },
        },
      },
      { $sort: { _id: -1 } },
      { $limit: searchPostListDto.limit },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: 'userid',
          as: 'user',
        },
      },
      { $unwind: { path: '$user' } },
      {
        $set: {
          authorDetail: {
            nickname: '$user.nickname',
            profileimg: '$user.profileimg',
            userid: '$user.userid',
            state: '$user.state',
          },
        },
      },
      { $unset: 'user' },
    ]);
  }

  getPostsWithIDList(useridList: string[], followerPostDTO: FollowerPostDto) {
    return this.postModel.aggregate([
      {
        $match: {
          author: { $in: useridList },
        },
      },
      { $sort: { _id: -1 } },
      { $limit: followerPostDTO.limit },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: 'userid',
          as: 'user',
        },
      },
      { $unwind: { path: '$user' } },
      {
        $set: {
          authorDetail: {
            nickname: '$user.nickname',
            profileimg: '$user.profileimg',
            userid: '$user.userid',
            state: '$user.state',
          },
          childPosts: { $size: '$childPosts' },
        },
      },
      { $unset: 'user' },
    ]);
  }

  getPostsWithIDListAndNext(
    useridList: string[],
    followerPostDTO: FollowerPostDto,
  ) {
    return this.postModel.aggregate([
      {
        $match: {
          author: { $in: useridList },
          _id: { $lt: new mongoose.Types.ObjectId(followerPostDTO.next) },
        },
      },
      { $sort: { _id: -1 } },
      { $limit: followerPostDTO.limit },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: 'userid',
          as: 'user',
        },
      },
      { $unwind: { path: '$user' } },
      {
        $set: {
          authorDetail: {
            nickname: '$user.nickname',
            profileimg: '$user.profileimg',
            userid: '$user.userid',
            state: '$user.state',
          },
          childPosts: { $size: '$childPosts' },
        },
      },
      { $unset: 'user' },
    ]);
  }
}
