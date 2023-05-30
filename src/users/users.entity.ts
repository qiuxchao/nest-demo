import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('user')
export class User {
  @ObjectIdColumn({ name: '_id' })
  id: ObjectId;

  @Column()
  username: string;

  @Column()
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
