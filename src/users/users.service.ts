import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { ObjectId, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /** 获取用户列表 */
  getUserList(): Promise<User[]> {
    return this.userRepository.find();
  }

  /** 创建用户 */
  async createUser(user: User): Promise<User> {
    console.log('111', user);
    return this.userRepository.save(user);
  }

  /** 更新用户 */
  updateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  /** 删除用户 */
  deleteUser(id: ObjectId): Promise<any> {
    return this.userRepository.delete(id);
  }

  /** 根据id获取用户 */
  getUserById(id: ObjectId): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
}
