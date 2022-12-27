import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  ParseBoolPipe,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, ListAllEntitiesDto } from 'src/users/dto/creatuser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { UpdateUserDto } from 'src/users/dto/updateuser.dto';
import { ValidateCreateUserProfilePipe } from 'src/users/pipes/validate-create-user-profile/validate-create-user-profile.pipe';
import { CreateUserProfileDto } from 'src/users/dto/createuserprofile.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('list-users')
  async getUsers(@Query() query: ListAllEntitiesDto) {
    try {
      var user = await this.userService.listUsers();

      return {
        message: 'fetched users',
        data: user,
      };
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('register-user')
  @UsePipes(new ValidationPipe())
  async registerUser(
    @Body(ValidateCreateUserPipe) createUserDto: CreateUserDto,
  ) {
    console.log(createUserDto);
    const { confirmPassword, ...userDetails } = createUserDto;
    var user = await this.userService.createUser(userDetails);

    return {
      message: 'user created',
      data: user,
    };
  }

  @Put('update-user/:id')
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() updateUserDetails: UpdateUserDto,
  ) {
    return {
      message: 'updated user',
      data: await this.userService.updateUsers(id, updateUserDetails),
    };
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'user feteched',
      data: await this.userService.getUserByID(id),
    };
  }
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'user deleted',
      data: await this.userService.deleteUserByID(id),
    };
  }

  @Post(':id/profile')
  @UsePipes(new ValidationPipe())
  async createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidateCreateUserProfilePipe)
    createUserProfile: CreateUserProfileDto,
  ) {
    var upserProfile = await this.userService.createUserProfile(
      id,
      createUserProfile,
    );
    return {
      message: 'user proile created',
      data: upserProfile,
    };
  }
}
