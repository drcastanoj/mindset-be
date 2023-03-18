import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, 
    private userService: UserService,
    private jwtService: JwtService) {}

    async validateUser(email: string , pass: string): Promise<any>{
        const user: User = await this.userModel.findOne({email}).exec();
        if (user && user.pass === pass) {
            const { pass, ...result } = user;
            return result;
          }
          return null;
        }
        async login(user: any) {
          const payload = { username: user.username, sub: user.userId };
          return {
            access_token: this.jwtService.sign(payload),
          };
        }
}

class UserDto {
    name: string;
    pass: string;
    email: string;
  }