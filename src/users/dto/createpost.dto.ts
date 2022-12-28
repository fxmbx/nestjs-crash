import { IsNotEmpty, IsNumber } from 'class-validator';
import { UserRolesEnum } from '../utils/types';

export class CreatePostDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  image_url: string;
  role: UserRolesEnum;
}
