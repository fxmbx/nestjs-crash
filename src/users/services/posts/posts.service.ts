import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/typeorm/entities/post';
import { CreatePostType } from 'src/users/utils/types';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    private userService: UsersService,
  ) {}

  async createPost(
    id: number,
    createPostDetails: CreatePostType,
  ): Promise<PostEntity> {
    const user = await this.userService.getUserByID(id);
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    const newPost = this.postRepository.create({
      ...createPostDetails,
      user: user,
    });
    return await this.postRepository.save(newPost);
  }
}
