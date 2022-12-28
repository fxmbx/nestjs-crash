import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/entities/user';
import { AuthDto } from 'src/users/dto';
import { CompareHash, HashData } from 'src/users/utils';
import { CreateUserType, Tokens } from 'src/users/utils/types';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  /**
   *
   */
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(authDto: AuthDto): Promise<Tokens> {
    const user = await this.userRepository.findOneBy({ email: authDto.email });
    if (!user || !CompareHash(authDto.password, user.password))
      throw new HttpException('invalid credentials', HttpStatus.BAD_REQUEST);
    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async logOut(userId: number) {
    try {
      await this.userRepository.update({ id: userId }, { refresh_token: null });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async refreshToken(userId: number, refreshToken: string) {
    try {
      const user = await this.userRepository.findOneBy({
        id: userId,
      });
      if (!user.refresh_token)
        throw new HttpException('Session Blocked', HttpStatus.UNAUTHORIZED);

      if (!CompareHash(refreshToken, user.refresh_token))
        throw new HttpException('Access Denied', HttpStatus.UNAUTHORIZED);
      const tokens = await this.getTokens(user.id, user.email, user.role);
      await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async signUp(createuserDetails: CreateUserType): Promise<Tokens> {
    try {
      var createdUser = await this.userService.createUser(createuserDetails);

      const tokens = await this.getTokens(
        createdUser.id,
        createdUser.email,
        createdUser.role,
      );
      await this.updateRefreshTokenHash(createdUser.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async getTokens(
    userId: number,
    email: string,
    role: string,
  ): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email: email, role: role },
        {
          secret: 'my-at-jwt-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email: email, role: role },
        {
          secret: 'my-rt-jwt-secret',
          expiresIn: 60 * 60 * 24,
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private async updateRefreshTokenHash(userId: number, refreshToken: string) {
    const hashedRefreshToken = await HashData(refreshToken);

    await this.userRepository.update(
      { id: userId },
      { refresh_token: hashedRefreshToken },
    );
  }
}
