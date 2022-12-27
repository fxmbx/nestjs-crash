import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/entities/user';
import { CreateUserType, UpdateUserType } from 'src/users/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  /**
   *
   */
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  createUser(userDetails: CreateUserType): Promise<UserEntity> {
    try {
      const newUser = this.userRepository.create({
        ...userDetails,
        created_at: new Date(),
      });
      return this.userRepository.save(newUser);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async listUsers(): Promise<UserEntity[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUsers(id: number, updateuserDetails: UpdateUserType) {
    try {
      return await this.userRepository.update(
        { id: id },
        { ...updateuserDetails },
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUserByID(id: number) {
    try {
      return await this.userRepository.delete({ id: id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserByID(id: number): Promise<UserEntity> {
    try {
      return await this.userRepository.findOneBy({ id: id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
