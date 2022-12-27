import { Injectable } from '@nestjs/common';
import { isEmpty, isNotEmptyObject } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { CreateUserType } from 'src/users/utils/types';

@Injectable()
export class UsersService {
  private fakeUsers: Array<CreateUserType> = [
    { id: 1, username: 'st_funbi', email: 'stfunbi@email.com' },
    { id: 2, username: 'jon_snow', email: 'jon@email.com' },
  ];
  fetchUsers() {
    return this.fakeUsers;
  }
  createUser(createUser: CreateUserType): CreateUserType {
    createUser.id = this.fakeUsers.length + 1;
    this.fakeUsers.push(createUser);
    return createUser;
  }
  fetchUseById(id: number): CreateUserType[] {
    var user = this.fakeUsers.filter((data) => data.id === id);
    console.log(user);

    return user;
  }
}
