import { Injectable } from '@nestjs/common';
import { Follow } from 'src/common/database/follow.schema';
import { FollowCreateDto } from './dto/follow-create-dto';
import { FollowRepository } from 'src/common/database/follow.repository';

@Injectable()
export class FollowService {
  constructor(private readonly userRepository: FollowRepository) {}

  async followUser(userid: string, targetid: string) {
    const data = await this.userRepository.create({
      userid,
      targetid,
    });
    console.log(data);
    return Promise.resolve({
      data,
    });
  }
}
