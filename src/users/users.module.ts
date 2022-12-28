import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/typeorm/entities/post';
import { ProfileEntity } from 'src/typeorm/entities/profile';
import { UserEntity } from 'src/typeorm/entities/user';
import { UsersController } from './controllers/users/users.controller';
import { ExampleMiddleware } from './middlewares/example/example.middleware';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { UsersService } from './services/users/users.service';
import { PostsService } from './services/posts/posts.service';
import { PostController } from './controllers/post/post.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { AccessTokenJwtStrategy, RefreshTokenJwtStrategy } from './startegies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserEntity, ProfileEntity, PostEntity]),
  ],
  controllers: [UsersController, PostController, AuthController],
  providers: [
    UsersService,
    PostsService,
    AuthService,
    AccessTokenJwtStrategy,
    RefreshTokenJwtStrategy,
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(UsersController)
      .apply(ExampleMiddleware)
      .forRoutes({
        path: 'users/:id',
        method: RequestMethod.GET,
      });
  }
}
