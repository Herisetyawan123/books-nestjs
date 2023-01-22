import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UsersService {
  private users: any[] = [];

  getUsers(): any[] {
    return this.users;
  }

  create(data: any) {
    this.users.push({ id: uuidv4(), ...data });
    return data;
  }
}
