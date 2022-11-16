import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.schema';
import { Post as Post_ } from './post.schema';
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
  getUserPosts(@Param('userid') userid: string): Promise<Post_[]> {
    return this.postService.getUserPosts(userid);
  }

  @Post()
  @UseGuards(AuthGuard())
  CreatePost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<Post_> {
    return this.postService.createPost(createPostDto, user);
  }

  @Get('/:id')
  getPostById(@Param('id', PostIdValidationPipe) id: string): Promise<Post_> {
    return this.postService.getPostById(id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deletePost(
    @Param('id', PostIdValidationPipe) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.postService.deletePost(id, user);
  }

  @Patch('/:id')
  updatePost(
    @Param('id', PostIdValidationPipe) id: string,
    @Body() post: CreatePostDto,
  ): Promise<Post_> {
    return this.postService.updatePost(id, post);
  }
}
