import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Post } from '../common/database/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from '../common/database/post.repository';
import { User } from 'src/common/database/user.schema';
import { FollowRepository } from 'src/common/database/follow.repository';
import { FollowerPostDto } from './dto/follower-post.dto';
import { UserRepository } from 'src/common/database/user.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly followRepository: FollowRepository,
    private readonly userRepository: UserRepository,
  ) {}

  getAllPosts(): Promise<Post[]> {
    return this.postRepository.find({});
  }

  getUserPosts(
    userid: string,
    followerPostDTO: FollowerPostDto,
  ): Promise<Post[]> {
    return this.postRepository.getUserPosts(userid, followerPostDTO);
  }

  createPost(createBoardDto: CreatePostDto, user: User): Promise<Post> {
    const post = this.postRepository.create(createBoardDto, user);
    this.userRepository.updatePostCount({ userid: user.userid }, 1);
    return post;
  }

  async getPostById(id: string) {
    const found = await this.postRepository.findOne({ _id: id });
    if (!found) throw new NotFoundException(`Can't find Board with ${id}`);
    return found;
  }

  async deletePost(id: string, user: User): Promise<void> {
    const post = await this.postRepository.findOne({ _id: id });
    if (!post) throw new NotFoundException();
    if (post.author !== user.userid) throw new UnauthorizedException();
    this.postRepository.deleteOne({ _id: id });
    this.userRepository.updatePostCount({ userid: user.userid }, -1);
    return;
  }

  async updatePost(id: string, createPostDto: CreatePostDto): Promise<Post> {
    return this.postRepository.findOneAndUpdate({ _id: id }, createPostDto);
  }

  async getFollowingPost(user: User, followerPostDTO: FollowerPostDto) {
    return await this.followRepository.getFollowingPostList(
      user.userid,
      followerPostDTO,
    );
  }
}
