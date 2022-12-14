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
  CacheTTL,
  UseInterceptors,
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
import { MoheyumInterceptor } from 'src/common/cache/cache.interceptor';
import { CacheEvict } from 'src/common/cache/cache-evict.decorator';
import { CachePagination } from 'src/common/cache/cache-next-ttl.decorator';
import { CacheIndividual } from 'src/common/cache/cahce-individual.decorator';
import { SearchPostListDto } from './dto/search-post-list.dto';

@Controller('post')
@UseInterceptors(MoheyumInterceptor)
export class PostController {
  constructor(private postService: PostService) {}

  @CachePagination(true)
  @CacheTTL(300)
  @Get('/author/:userid')
  async getUserPosts(
    @Param('userid') userid: string,
    @Query() followerPostDTO: FollowerPostDto,
  ) {
    return await this.postService.getUserPosts(userid, followerPostDTO);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @CacheIndividual('post')
  @CacheEvict('myinfo', 'parent')
  @Post()
  async CreatePost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ) {
    return {
      post: await this.postService.createPost(createPostDto, user),
    };
  }

  @UseGuards(JwtAuthGuard)
  @CachePagination(true)
  @CacheIndividual('userid')
  @CacheTTL(20)
  @Get('newsfeed')
  async getFollowingPost(
    @GetUser() user: User,
    @Query() followerPostDTO: FollowerPostDto,
  ) {
    return await this.postService.getFollowingPost(user, followerPostDTO);
  }

  @HttpCode(200)
  @CachePagination(true)
  @CacheTTL(20)
  @Get('/search')
  async searchPost(@Query() searchPostListDto: SearchPostListDto) {
    return await this.postService.searchPost(searchPostListDto);
  }

  @CacheTTL(24 * 60 * 60)
  @Get('/:id')
  async getPostById(@Param('id', PostIdValidationPipe) id: string): Promise<{
    post: Post_;
  }> {
    const postData = await this.postService.getPostById(id);
    return {
      post: postData,
    };
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard, PostGuard)
  @CacheEvict('', 'myInfo')
  @CacheIndividual('post')
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  deletePost(
    @Param('id', PostIdValidationPipe) id: string,
    @GetUser() user: User,
  ): {
    post: Promise<void>;
  } {
    return {
      post: this.postService.deletePost(id, user),
    };
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard, PostGuard)
  @CacheEvict('')
  @CacheIndividual('post')
  @Patch('/:id')
  updatePost(
    @Param('id', PostIdValidationPipe) id: string,
    @Body() post: CreatePostDto,
  ): {
    post: Promise<Post_>;
  } {
    return {
      post: this.postService.updatePost(id, post),
    };
  }

  @Get('comments/:id')
  async getCommentsByPostId(
    @Param('id', PostIdValidationPipe) id: string,
    @Query() followerPostDTO: FollowerPostDto,
  ): Promise<{ post: Post_[]; next: string }> {
    const data = await this.postService.getCommentsOfPost(id, followerPostDTO);
    return data;
  }
}
