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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/common/database/user.schema';
import { Post as Post_ } from '../common/database/post.schema';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostIdValidationPipe } from './pipes/post-id-validation.pipe';

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
  @UseGuards(AuthGuard())
  CreatePost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): {
    message: string;
    data: { post: Promise<Post_> };
  } {
    return {
      message: 'success',
      data: { post: this.postService.createPost(createPostDto, user) },
    };
  }

  @Get('/:id')
  getPostById(@Param('id', PostIdValidationPipe) id: string): {
    message: string;
    data: { post: Promise<Post_> };
  } {
    return {
      message: 'success',
      data: { post: this.postService.getPostById(id) },
    };
  }
  @HttpCode(200)
  @Delete('/:id')
  @UseGuards(AuthGuard())
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
