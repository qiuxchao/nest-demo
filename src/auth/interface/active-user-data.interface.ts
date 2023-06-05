import { ObjectId } from 'typeorm';

export interface ActiveUserData {
  typeid: ObjectId;
  username: string;
}
