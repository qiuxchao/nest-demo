import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn({
    length: 8,
  })
  id: ObjectId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
