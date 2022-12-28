import { AuthGuard } from '@nestjs/passport';

export class RefreshTokenGuardGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}
