import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersServices.getUsers();
  }

  @Post()
  createUser(
    @Body('username') username: string,
    @Body('full_name') full_name: string,
    @Body('password') password: string,
    @Body('email') email: string,
  ) {
    return this.usersServices.create({ username, full_name, password, email });
  }
}
