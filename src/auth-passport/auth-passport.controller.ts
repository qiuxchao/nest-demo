import { Controller, Post, Body } from '@nestjs/common';
import { AuthPassportService } from './auth-passport.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth-passport')
export class AuthPassportController {
  constructor(private readonly authPassportService: AuthPassportService) {}

  @Post()
  async signIn(@Body() signInDto: SignInDto) {
    console.log('signInDto: ', signInDto);
    return '登录';
  }

  @Post()
  async signUp(@Body() signUpDto: SignUpDto) {
    console.log('signUpDto: ', signUpDto);
    return '注册';
  }
}
