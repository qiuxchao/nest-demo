import { Module } from '@nestjs/common';
import { AuthPassportService } from './auth-passport.service';
import { AuthPassportController } from './auth-passport.controller';

@Module({
  controllers: [AuthPassportController],
  providers: [AuthPassportService],
})
export class AuthPassportModule {}
