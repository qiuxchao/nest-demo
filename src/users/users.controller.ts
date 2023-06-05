import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { ObjectId } from 'typeorm';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list')
  getUserList(@Req() req): Promise<User[]> {
    console.log('req: ', req.user);
    return this.usersService.getUserList();
  }

  @Post('create')
  createUser(@Body() body: User): Promise<User> {
    console.log('222', body);
    return this.usersService.createUser(body);
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
  getUserById(@Body('id') id): Promise<User> {
    console.log('333', id);
    return this.usersService.getUserById(id);
  }
}
