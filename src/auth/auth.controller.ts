import { Controller, Get } from '@nestjs/common';
import { Param, Query } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  @Get()
  validateUser(@Query() { userName, password }: any) {
    return this.authServices.validateUser(userName, password);
  }
  constructor(private authServices: AuthService) {}
}
