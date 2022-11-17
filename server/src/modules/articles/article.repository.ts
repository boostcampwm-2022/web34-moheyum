import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './article.schema';
import { Model, FilterQuery } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticleRepository {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async find(boardFilterQuery: FilterQuery<Article>): Promise<Article[]> {
    return this.articleModel.find(boardFilterQuery);
  }

  async findOne(boardFilterQuery: FilterQuery<Article>): Promise<Article> {
    return this.articleModel.findOne(boardFilterQuery);
  }

  async create(createBoardDto: CreateArticleDto): Promise<Article> {
    const { title, description } = createBoardDto;

    const newBoard = new this.articleModel({
      title,
      description: description,
      author: "",
    });
    return newBoard.save();
  }

  async findOneAndUpdate(
    boardFilterQuery: FilterQuery<Article>,
    board: Partial<Article>,
  ): Promise<Article> {
    const result = await this.articleModel.findOneAndUpdate(
      boardFilterQuery,
      board,
    );
    if (!result) throw new NotFoundException();
    return result;
  }

  async deleteOne(boardFilterQuery: FilterQuery<Article>): Promise<number> {
    const result = await this.articleModel.deleteOne(boardFilterQuery);
    //{ acknowledged: true, deletedCount: 1 }
    if (result.deletedCount === 0) throw new NotFoundException();
    return result.deletedCount;
  }
}
