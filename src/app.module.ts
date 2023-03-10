import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './typeorm/entities/post';
import { ProfileEntity } from './typeorm/entities/profile';
import { UserEntity } from './typeorm/entities/user';
import { AccessTokenGuardGuard } from './users/guards';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3360,
      username: 'root',
      password: 'P@!',
      database: 'nestjs_mysql_tutorial',
      entities: [UserEntity, ProfileEntity, PostEntity],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuardGuard,
    },
  ],
})
export class AppModule {}
