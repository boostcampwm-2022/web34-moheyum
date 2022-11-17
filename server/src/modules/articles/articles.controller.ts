import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Article } from './article.schema';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('article')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  getAllArticles(): Promise<Article[]> {
    return this.articlesService.getAllArticles();
  }

  @Get('/author/:userid')
  getUserArticles(@Param('userid') userid: string): Promise<Article[]> {
    return this.articlesService.getUserArticles(userid);
  }

  @Post()
  @UsePipes(ValidationPipe)
  CreateArticle(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    return this.articlesService.createArticle(createArticleDto);
  }

  @Get('/:id')
  getArticleById(@Param('id') id: string): Promise<Article> {
    return this.articlesService.getArticleById(id);
  }

  @Delete('/:id')
  deleteArticle(
    @Param('id') id: string,
  ): Promise<void> {
    return this.articlesService.deleteArticle(id);
  }

  @Patch('/:id/status')
  updateArticle(
    @Param('id') id: string,
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    return this.articlesService.updateArticle(id, createArticleDto);
  }
}
