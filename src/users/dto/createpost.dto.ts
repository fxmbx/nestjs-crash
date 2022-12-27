import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePostDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  image_url: string;
}
