import { Controller, Get, Post, Body } from '@nestjs/common';
import { users as UserModel } from '@prisma/client';
import { UsersService } from './user.service';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(private readonly userService: UsersService) {}

  @Post('user')
  async signupUser(
    @Body()
    userData: {
      username: string;
      email: string;
      role: string;
      created_at?: string | Date;
      shop_id: string;
      password: string;
      avatar: string;
    },
  ): Promise<UserModel> {
    const password = bcrypt.hashSync(userData.password, 10);
    userData.password = password;

    return this.userService.createUsers(userData);
  }

  @Get('users')
  async getUsers(): Promise<UserModel[]> {
    return this.userService.users({});
  }
}
