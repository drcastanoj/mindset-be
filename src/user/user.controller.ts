import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Body, Post } from '@nestjs/common/decorators';
import { UserDto } from './user.dto';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser() {
    return this.userService.findAll();
  }

  @Post()
  createUser(@Body() createUserDto: UserDto){
    return this.userService.create(createUserDto)
  }
}
