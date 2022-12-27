import { UserEntity } from 'src/typeorm/entities/user';

export type CreateUserType = {
  username: string;
  email: string;
  password: string;
};

export type UpdateUserType = {
  username: string;
  email: string;
};

export type CreateUserProfileType = {
  first_name: string;
  last_name: string;
  age: number;
  dob: string;
};

export type CreatePostType = {
  title: string;
  description: string;
  image_url: string;
};
