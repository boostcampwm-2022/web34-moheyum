import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Article } from './article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleRepository } from './article.repository';

@Injectable()
export class ArticlesService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find({});
  }

  getUserArticles(userid: string): Promise<Article[]> {
    return this.articleRepository.find({ author: userid });
  }

  createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articleRepository.create(createArticleDto);
  }

  async getArticleById(id: string): Promise<Article> {
    const found = await this.articleRepository.findOne({ _id: id });
    if (!found) throw new NotFoundException(`Can't find article with ${id}`);
    return found;
  }

  async deleteArticle(id: string): Promise<void> {
    const article = await this.articleRepository.findOne({ _id: id });
    if (!article) throw new NotFoundException();
    this.articleRepository.deleteOne({ _id: id });
    return;
  }

  async updateArticle(id: string, createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articleRepository.findOneAndUpdate({ _id: id }, createArticleDto);
  }
}
