import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private userService: UserService) {}

    async validateUser(email: string , pass: string): Promise<any>{
        //let result;
        const user: User = await this.userModel.findOne({email}).exec();
        if (user && user.pass === pass) {
            const { pass, ...result } = user;
            console.log(result);
            return result;
          }
          return null;
        }
        
}

class UserDto {
    name: string;
    pass: string;
    email: string;
  }