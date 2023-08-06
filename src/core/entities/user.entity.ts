import { Exclude } from 'class-transformer';

export class User {
  id: string; // uuid v4
  login: string;
  
  @Exclude()
  password: string;
  
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation, js number type
  updatedAt: number; // timestamp of last update, js number type

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
