import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user: User = await this.userService.findOne(email);
    if (user && user.pass === pass) {
      const { pass, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = { name: user._doc.name, email: user._doc.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
