import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';
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

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() userDto: Partial<UserDto>) {
    return this.userService.updateUser(id, userDto);
  }
}
