import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { AuthPassportService } from './auth-passport.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthPassportController {
  constructor(private readonly authPassportService: AuthPassportService) {}

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body(ValidationPipe) signInDto: SignInDto) {
    return this.authPassportService.signIn(signInDto);
  }

  @Public()
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body(ValidationPipe) signUpDto: SignUpDto) {
    return this.authPassportService.signUp(signUpDto);
  }
}
