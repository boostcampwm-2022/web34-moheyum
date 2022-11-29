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
import { PostGuard } from 'src/common/guard/post.guard';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getAllPosts(): Promise<Post_[]> {
    return this.postService.getAllPosts();
  }

  @Get('/author/:userid')
  async getUserPosts(
    @Param('userid') userid: string,
    @Query() followerPostDTO: FollowerPostDto,
  ) {
    return {
      message: 'success',
      data: await this.postService.getUserPosts(userid, followerPostDTO),
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


  @HttpCode(200)
  @Get('/search')
  async searchPost(@Query('next') next: string, @Query('keyword') keyword: string){
    return {
      message: 'success',
      data: await this.postService.searchPost(keyword, next),
    }
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
  @UseGuards(JwtAuthGuard, PostGuard)
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
  @UseGuards(JwtAuthGuard, PostGuard)
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

  @Get('comments/:id')
  async getCommentsByPostId(
    @Param('id', PostIdValidationPipe) id: string,
    @Query() followerPostDTO: FollowerPostDto,
  ): Promise<{ message: string; data: { post: Post_[]; next: string } }> {
    const data = await this.postService.getCommentsOfPost(id, followerPostDTO);
    return {
      message: 'success',
      data: data,
    };
  }
}
