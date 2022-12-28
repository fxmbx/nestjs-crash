import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserID, Public } from 'src/common';
import { AuthDto, CreateUserDto } from 'src/users/dto';
import {
  AccessTokenGuardGuard,
  RefreshTokenGuardGuard,
} from 'src/users/guards';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { AuthService } from 'src/users/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @UsePipes(new ValidationPipe())
  @Public()
  async signIn(@Body() authDetails: AuthDto) {
    try {
      var tokens = await this.authService.signIn(authDetails);
      return {
        message: `sign in successful`,
        data: {
          email: authDetails.email,
          tokens,
        },
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('/signup')
  @Public()
  @UsePipes(new ValidationPipe())
  async signUp(@Body(ValidateCreateUserPipe) createUserDto: CreateUserDto) {
    const { confirmPassword, ...userDetails } = createUserDto;
    try {
      var tokens = await this.authService.signUp(userDetails);

      return {
        message: `${createUserDto.username} sign up successful`,
        data: tokens,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/logOut')
  // @UseGuards(AccessTokenGuardGuard)
  async logOut(@GetCurrentUserID() userId: number) {
    try {
      await this.authService.logOut(userId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('/refresh-token')
  @UseGuards(RefreshTokenGuardGuard)
  @HttpCode(200)
  async refreshToken(
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUserID() userId: number,
  ) {
    try {
      await this.authService.refreshToken(userId, refreshToken);
    } catch (error) {
      throw new HttpException({ error: error }, error.status);
    }
  }
}
