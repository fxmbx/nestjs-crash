import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/users/services/auth/auth.service';

export type JwtPayload = {
  sub: number;
  email: string;
  role: string;
};
@Injectable()
export class AccessTokenJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'my-at-jwt-secret',
      //   issuer: 'accounts.examplesoft.com',
      //   audience: 'yoursite.net',
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
