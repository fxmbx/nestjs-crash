import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRolesEnum } from '../utils/types';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;

  role: UserRolesEnum;
}

export class ListAllEntitiesDto {
  Limit: number;
  Offset: number;
}
