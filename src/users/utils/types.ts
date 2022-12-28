export type CreateUserType = {
  username: string;
  email: string;
  role: UserRolesEnum;
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

export enum UserRolesEnum {
  REGULARUSER = 'regular_user',
  POSTUSER = 'post_user',
  ADMINUSER = 'admin_user',
}

export type Tokens = {
  access_token: string;
  refresh_token: string;
};
