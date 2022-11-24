import {
  CanActivate,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PostService } from 'src/post/post.service';

@Injectable()
export class PostGuard implements CanActivate {
  constructor(private readonly postService: PostService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const postid = req.params.id;
    const post = await this.postService.getPostById(postid);
    if (req.user.userid === post.author) return true;

    throw new UnauthorizedException();
  }
}
