import { Injectable } from '@nestjs/common';
import { Post } from '../../database/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from '../../database/post.repository';
import { User } from 'src/database/user.schema';
import { FollowRepository } from 'src/database/follow.repository';
import { FollowerPostDto } from './dto/follower-post.dto';
import { UserRepository } from 'src/database/user.repository';
import { NotificationRepository } from 'src/database/notification.repository';
import { EventService } from 'src/domain/event/event.service';
import { SearchPostListDto } from './dto/search-post-list.dto';
import {
  NEWSFEED_LIMIT,
  SEARCH_POST_LIMIT,
} from 'src/constants/pagination.constants';
import { PostNotFoundException } from 'src/exception/post.exception';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly followRepository: FollowRepository,
    private readonly userRepository: UserRepository,
    private readonly notificationRepository: NotificationRepository,
    private readonly eventService: EventService,
  ) {}

  getAllPosts(): Promise<Post[]> {
    return this.postRepository.find({});
  }

  getUserPosts(
    userid: string,
    followerPostDTO: FollowerPostDto,
  ): Promise<{ post: Post[]; next: string }> {
    return followerPostDTO.next === ''
      ? this.postRepository.getUserPosts(userid)
      : this.postRepository.getUserPostsWithNext(userid, followerPostDTO);
  }

  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const post = await this.postRepository.create(createPostDto, user);
    if (post?.parentPost !== '') {
      const parentPost = await this.postRepository.findOne({
        _id: post.parentPost,
      });
      this.notificationRepository.create(
        parentPost.author,
        `${user.nickname}(${user.userid})님이 답글을 작성하셨습니다.`,
        `/post/${post._id}`,
      );
      this.eventService.emit(parentPost.author, { data: true });
    }
    if (createPostDto.mentions && createPostDto.mentions.length >= 1) {
      createPostDto.mentions.forEach((v: string) => {
        if (v !== user.userid) {
          this.notificationRepository.create(
            v,
            `${user.nickname}(${user.userid})님이 회원님을 언급하였습니다.`,
            `/post/${post._id}`,
          );
          this.eventService.emit(v, { data: true });
        }
      });
    }
    await this.userRepository.updatePostCount({ userid: user.userid }, 1);
    return post;
  }

  async getPostById(id: string) {
    const found = await this.postRepository.findOne({ _id: id });
    if (!found) throw new PostNotFoundException();
    return found;
  }

  async deletePost(id: string, user: User): Promise<void> {
    this.postRepository.findAndDelete({ _id: id });
    this.userRepository.updatePostCount({ userid: user.userid }, -1);
    return;
  }

  async updatePost(id: string, createPostDto: CreatePostDto): Promise<Post> {
    return this.postRepository.findOneAndUpdate({ _id: id }, createPostDto);
  }

  async getFollowingPost(user: User, followerPostDTO: FollowerPostDto) {
    const list = await this.followRepository.getFollowingUsersList(user.userid);
    list.push(user.userid);

    let result;
    if (followerPostDTO.next)
      result = await this.postRepository.getPostsWithIDListAndNext(
        list,
        followerPostDTO,
      );
    else result = await this.postRepository.getPostsWithIDList(list);
    return {
      post: result,
      next: result.length < NEWSFEED_LIMIT ? '' : result.at(-1)._id,
    };
  }

  async searchPost(searchPostListDto: SearchPostListDto) {
    let result;
    if (searchPostListDto.next !== '')
      result = await this.postRepository.searchPostWithNext(searchPostListDto);
    else result = await this.postRepository.searchPost(searchPostListDto);
    return {
      post: result,
      next: result.length < SEARCH_POST_LIMIT ? '' : result.at(-1)._id,
    };
  }
  getCommentsOfPost(id: string, followerPostDTO: FollowerPostDto) {
    return followerPostDTO.next === ''
      ? this.postRepository.getComments(id)
      : this.postRepository.getCommentsWithNext(id, followerPostDTO);
  }
}
