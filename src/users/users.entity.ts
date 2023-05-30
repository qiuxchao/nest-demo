import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn({ name: '_id' })
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  city: string;

  @Column({ default: true })
  isActive: boolean;
}
