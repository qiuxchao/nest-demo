import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUserList(): string {
    return 'This action returns all users';
  }
}
