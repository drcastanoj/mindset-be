import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';


@Module({
  providers: [AuthService, LocalStrategy],
  imports: [UserModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), PassportModule],
  controllers: [AuthController]
})
export class AuthModule {}