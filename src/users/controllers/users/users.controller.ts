import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Req,
  Res,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  ParseBoolPipe,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, ListAllEntitiesDto } from 'src/users/dto/users.dto';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/services/users/users.service';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get('list-users')
  getUsers(@Query() query: ListAllEntitiesDto) {
    return {
      message: 'following SOLID, D',
      data: this.userService.fetchUsers(),
    };
  }

  @Get('posts')
  getUsersPost(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean) {
    console.log(sortDesc);

    return [
      {
        username: 'Funmibi',
        email: 'funbiolaore@gmail.com',
        posts: [
          {
            id: 1,
            title: 'post 1',
          },
          {
            id: 2,
            title: 'post 2',
          },
        ],
      },
    ];
  }

  @Post('register-user')
  @UsePipes(new ValidationPipe())
  registerUser(@Body(ValidateCreateUserPipe) createUserDto: CreateUserDto) {
    console.log(createUserDto);
    var serviceResoinse = this.userService.createUser(createUserDto);

    return {
      message: 'user created',
      data: serviceResoinse,
    };
  }

  @Post('create')
  createUser(@Req() request: Request, @Res() response: Response) {
    response.status(200).json({
      message: 'created',
      data: request.body,
      success: true,
    });
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): any {
    var user = this.userService.fetchUseById(id);
    if (user.length < 1)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return {
      message: 'user feteched',
      data: user,
    };
  }

  @Get('get-user/:id/:postid')
  getUserById(
    @Param('id', ParseIntPipe) id: number,
    @Param('postid') postId: string,
  ) {
    console.log(id);
    return {
      message: 'fetech users',
      data: {
        id,
        postId,
      },
    };
  }
}
