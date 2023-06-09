import { Module } from '@nestjs/common';
import { AuthPassportService } from './auth-passport.service';
import { AuthPassportController } from './auth-passport.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import jwtConfig from 'src/config/jwt.config';
import { JwtStrategy } from './jwt.strategy';
import { HashingService } from './hashing.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthPassportController],
  providers: [
    // 注册全局守卫，公开的路由使用 @Public() 装饰器标记
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AuthPassportService,
    JwtStrategy,
    HashingService,
  ],
})
export class AuthPassportModule {}
