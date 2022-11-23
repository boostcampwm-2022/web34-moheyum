import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../database/post.schema';
import { Model, FilterQuery } from 'mongoose';
import { CreatePostDto } from '../../post/dto/create-post.dto';
import { User } from 'src/common/database/user.schema';
import { FollowerPostDto } from 'src/post/dto/follower-post.dto';

@Injectable()
export class PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async find(postFilterQuery: FilterQuery<Post>): Promise<Post[]> {
    return this.postModel.find(postFilterQuery).sort({ createdAt: -1 });
  }

  async findOne(postFilterQuery: FilterQuery<Post>): Promise<Post> {
    return this.postModel.findOne(postFilterQuery);
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

  async getUserPosts(authorid: string, followerPostDTO: FollowerPostDto) {
    const { page, limit } = followerPostDTO;
    console.log(authorid);
    return this.postModel.aggregate([
      {
        $match: { author: authorid },
      },
      { $skip: page * limit },
      { $limit: limit },
      { $addFields: { nextpage: page + 1 } },
    ]);
  }
}
