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
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/common/database/user.schema';
import { Post as Post_ } from '../common/database/post.schema';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostIdValidationPipe } from './pipes/post-id-validation.pipe';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getAllPosts(): Promise<Post_[]> {
    return this.postService.getAllPosts();
  }

  @Get('/author/:userid')
  async getUserPosts(@Param('userid') userid: string): Promise<{
    message: string;
    data: { post: Post_[] };
  }> {
    const data = await this.postService.getUserPosts(userid);
    return {
      message: 'success',
      data: { post: data },
    };
  }

  @HttpCode(200)
  @Post()
  @UseGuards(JwtAuthGuard)
  CreatePost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): {
    message: string;
    data: { post: Promise<Post_> };
  } {
    console.log(createPostDto.description);
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
