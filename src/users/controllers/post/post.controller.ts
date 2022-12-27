import {
  Controller,
  Body,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreatePostDTO } from 'src/users/dto/createpost.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { PostsService } from 'src/users/services/posts/posts.service';

@Controller('post')
@UseGuards(AuthGuard)
export class PostController {
  /**
   *
   */
  constructor(private postService: PostsService) {}

  @Post(':id/create-post')
  @UsePipes(new ValidationPipe())
  async createPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() creatPostDto: CreatePostDTO,
  ) {
    var userPost = await this.postService.createPost(id, creatPostDto);

    return {
      message: 'post created',
      data: userPost,
    };
  }
}
