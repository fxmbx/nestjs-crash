import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/typeorm/entities/profile';
import { UserEntity } from 'src/typeorm/entities/user';
import {
  CreateUserProfileType,
  CreateUserType,
  UpdateUserType,
} from 'src/users/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  /**
   *
   */
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
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
      return this.userRepository.find({ relations: ['profile', 'posts'] });
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
  async createUserProfile(
    id: number,
    createUserProfileDetails: CreateUserProfileType,
  ): Promise<UserEntity> {
    try {
      var user = await this.userRepository.findOneBy({ id: id });
      if (!user)
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);

      const newProfile = this.profileRepository.create({
        ...createUserProfileDetails,
      });
      const savedProfile = await this.profileRepository.save(newProfile);
      user.profile = savedProfile;
      return await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
