import { Injectable } from '@nestjs/common';
import { Post } from '../common/database/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from '../common/database/post.repository';
import { User } from 'src/common/database/user.schema';
import { FollowRepository } from 'src/common/database/follow.repository';
import { FollowerPostDto } from './dto/follower-post.dto';
import { UserRepository } from 'src/common/database/user.repository';
import { NotificationRepository } from 'src/common/database/notification.repository';
import { EventService } from 'src/alarm/event.service';
import { PostException } from 'src/common/exeception/post.exception';


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
      ? this.postRepository.getUserPosts(userid, followerPostDTO)
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
    if (!found) throw PostException.postNotFound();
    return found;
  }

  async deletePost(id: string, user: User): Promise<void> {
    const post = await this.postRepository.findOne({ _id: id });
    if (!post) throw PostException.postNotFound();
    if (post.author !== user.userid) throw PostException.postUnAuthorized();
    this.postRepository.deleteOne({ _id: id });
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
    else
      result = await this.postRepository.getPostsWithIDList(
        list,
        followerPostDTO,
      );
    return {
      post: result,
      next: result.length < followerPostDTO.limit ? '' : result.at(-1)._id,
    };
  }

  async searchPost(keyword: string, next: string) {
    let result;
    if (next)
      result = await this.postRepository.searchPostWithNext(keyword, next);
    else result = await this.postRepository.searchPost(keyword);
    return {
      post: result,
      next: result.length < 10 ? '' : result.at(-1)._id,
    };
  }
  getCommentsOfPost(id: string, followerPostDTO: FollowerPostDto) {
    return followerPostDTO.next === ''
      ? this.postRepository.getComments(id, followerPostDTO)
      : this.postRepository.getCommentsWithNext(id, followerPostDTO);
  }
}
