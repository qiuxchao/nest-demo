import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectId } from 'typeorm';
import { User } from '../users/users.entity';
import jwtConfig from '../config/jwt.config';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { HashingService } from './hashing.service';
import { ActiveUserData } from './interface/active-user-data.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly hashingService: HashingService,
  ) {}

  /** 登录 */
  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await this.hashingService.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return await this.generateToken(user);
  }

  /** 生成 token */
  async generateToken(user: User) {
    const token = await this.signToken<Partial<ActiveUserData>>(user.id, {
      username: user.username,
    });
    return {
      token,
    };
  }

  /** 签名 token */
  private async signToken<T>(userId: ObjectId, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
  }

  /** 注册 */
  async signUp(signUpDto: SignUpDto) {
    const { username, password, ...restSignUpDto } = signUpDto;
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new Error('User already exists');
    }
    // 生成hash密码
    const hashedPassword = await this.hashingService.hash(password);
    const user = await this.userRepository.create({
      ...restSignUpDto,
      username,
      password: hashedPassword,
      isActive: true,
    });
    await this.userRepository.save(user);
  }
}
