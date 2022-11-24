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

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly followRepository: FollowRepository,
  ) {}

  getAllPosts(): Promise<Post[]> {
    return this.postRepository.find({});
  }

  getUserPosts(userid: string): Promise<Post[]> {
    return this.postRepository.find({ author: userid });
  }

  createPost(createBoardDto: CreatePostDto, user: User): Promise<Post> {
    return this.postRepository.create(createBoardDto, user);
  }

  async getPostById(id: string): Promise<Post> {
    const found = await this.postRepository.findOne({ _id: id });
    if (!found) throw new NotFoundException(`Can't find Board with ${id}`);
    return found;
  }

  async deletePost(id: string, user: User): Promise<void> {
    const post = await this.postRepository.findOne({ _id: id });
    if (!post) throw new NotFoundException();
    if (post.author !== user.userid) throw new UnauthorizedException();
    this.postRepository.deleteOne({ _id: id });
    return;
  }

  async updatePost(id: string, createPostDto: CreatePostDto): Promise<Post> {
    return this.postRepository.findOneAndUpdate({ _id: id }, createPostDto);
  }

  getFollowingPost(user: User, followerPostDTO: FollowerPostDto) {
    return followerPostDTO.next === ''
      ? this.followRepository.getFollowingPostListWithoutNext(
          user.userid,
          followerPostDTO,
        )
      : this.followRepository.getFollowingPostList(
          user.userid,
          followerPostDTO,
        );
    // return this.followRepository.getFollowingPostList(
    //   user.userid,
    //   followerPostDTO,
    // );
  }
}
