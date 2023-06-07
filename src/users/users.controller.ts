import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { ObjectId } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list')
  async getUserList(): Promise<User[]> {
    const users = await this.usersService.getUserList();
    // 排除 password 字段
    return users.map((user) =>
      Object.assign(new User(), plainToClass(User, user)),
    );
  }

  @Post('update')
  updateUser(@Body() body: User): Promise<User> {
    return this.usersService.updateUser(body);
  }

  @Post('delete')
  deleteUser(@Body() body: { id: ObjectId }): Promise<any> {
    return this.usersService.deleteUser(body.id);
  }

  @Post('info')
  async getUserById(@Body() body: { id: ObjectId }): Promise<User> {
    const user = await this.usersService.getUserById(body.id);
    // 排除 password 字段
    return Object.assign(new User(), plainToClass(User, user));
  }
}
