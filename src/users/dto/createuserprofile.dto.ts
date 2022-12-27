import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserProfileDto {
  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;
  @IsNotEmpty()
  @IsNumber()
  age: number;
  @IsNotEmpty()
  dob: string;
}
