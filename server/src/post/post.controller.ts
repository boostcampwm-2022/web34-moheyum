import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  HttpCode,
  Query,
} from '@nestjs/common';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/common/database/user.schema';
import { Post as Post_ } from '../common/database/post.schema';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostIdValidationPipe } from './pipes/post-id-validation.pipe';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { FollowerPostDto } from './dto/follower-post.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getAllPosts(): Promise<Post_[]> {
    return this.postService.getAllPosts();
  }

  @Get('/author/:userid')
  getUserPosts(@Param('userid') userid: string): {
    message: string;
    data: { post: Promise<Post_[]> };
  } {
    return {
      message: 'success',
      data: { post: this.postService.getUserPosts(userid) },
    };
  }

  @HttpCode(200)
  @Post()
  @UseGuards(JwtAuthGuard)
  async CreatePost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ) {
    return {
      message: 'success',
      data: { post: await this.postService.createPost(createPostDto, user) },
    };
  }

  @Get('newsfeed')
  @UseGuards(JwtAuthGuard)
  async getFollowingPost(
    @GetUser() user: User,
    @Query() followerPostDTO: FollowerPostDto,
  ) {
    return {
      message: 'success',
      data: await this.postService.getFollowingPost(user, followerPostDTO),
    };
  }

  @Get('/:id')
  async getPostById(@Param('id', PostIdValidationPipe) id: string): Promise<{
    message: string;
    data: { post: Post_ };
  }> {
    const postData = await this.postService.getPostById(id);
    return {
      message: 'success',
      data: { post: postData },
    };
  }
  @HttpCode(200)
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  deletePost(
    @Param('id', PostIdValidationPipe) id: string,
    @GetUser() user: User,
  ): {
    message: string;
    data: { post: Promise<void> };
  } {
    return {
      message: 'success',
      data: { post: this.postService.deletePost(id, user) },
    };
  }

  @HttpCode(200)
  @Patch('/:id')
  updatePost(
    @Param('id', PostIdValidationPipe) id: string,
    @Body() post: CreatePostDto,
  ): {
    message: string;
    data: { post: Promise<Post_> };
  } {
    return {
      message: 'success',
      data: { post: this.postService.updatePost(id, post) },
    };
  }
}
