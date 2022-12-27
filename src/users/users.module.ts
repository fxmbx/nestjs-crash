import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/entities/user';
import { UsersController } from './controllers/users/users.controller';
import { ExampleMiddleware } from './middlewares/example/example.middleware';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService],
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
