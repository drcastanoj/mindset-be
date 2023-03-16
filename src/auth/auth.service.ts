import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private userService: UserService) {}

    async validateUser(email: string , pass: string): Promise<any>{
        console.log(email, pass);
        let validate;
        const user = await this.userModel.find().exec();
        user.forEach((value) => {
            console.log(value.email);
            if (email && pass && value.pass == pass && value.email == email) {
                validate = 'true';
            } else {
                validate = 'false';  
            }
        })
    }
}
