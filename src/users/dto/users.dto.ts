import {
  IsAlphanumeric,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ignoreElements } from 'rxjs';

export class CreateUserDto {
  @IsEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  password: string;
}

export class ListAllEntitiesDto {
  Limit: number;
  Offset: number;
}
