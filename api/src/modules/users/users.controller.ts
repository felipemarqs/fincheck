import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  me(@Request() request: any) {
    return this.usersService.getUserById(request.userId);
  }
}
