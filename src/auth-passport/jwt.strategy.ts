import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ActiveUserData } from './interface/active-user-data.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头中获取token
      ignoreExpiration: false, // 不忽略过期时间
      secretOrKey: process.env.JWT_SECRET, // 密钥
    });
  }

  // 验证完成后将调用此方法，返回用户信息
  async validate(payload: ActiveUserData) {
    return { userId: payload.sub, username: payload.username };
  }
}
