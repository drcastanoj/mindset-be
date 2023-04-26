import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { AppointmentModule } from './appointment/appointment.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('', { dbName: 'mindset' }),
    AuthModule,
    AppointmentModule,
    PassportModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
