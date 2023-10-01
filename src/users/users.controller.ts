import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('address')
  getAllAddress() {
    return this.usersService.getAllAddressesWithUsers();
  }

  @Get()
  getAllUser() {
    return this.usersService.getAllUser();
  }
}
