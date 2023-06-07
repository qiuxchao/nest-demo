import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User {
  @ObjectIdColumn({ name: '_id' })
  id: ObjectId;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  city: string;

  @Column({ default: true })
  isActive: boolean;
}
