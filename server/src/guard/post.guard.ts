import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PostService } from 'src/domain/post/post.service';
import { PostUnAuthorizedException } from 'src/exeception/post.exception';

@Injectable()
export class PostGuard implements CanActivate {
  constructor(private readonly postService: PostService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const postid = req.params.id;
    const post = await this.postService.getPostById(postid);
    if (req.user.userid === post.author) return true;

    throw new PostUnAuthorizedException();
  }
}
