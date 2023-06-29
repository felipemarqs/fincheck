import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  me(@Request() request: any) {
    console.log('Request in User get route: ', request.userId);
    return this.usersService.getUserById('userId');
  }
}
