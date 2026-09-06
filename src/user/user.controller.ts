import { Controller, Get, Patch, Delete, Param } from '@nestjs/common';
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
  createUser(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
