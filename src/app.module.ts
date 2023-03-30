import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://daniel:CLN3ZhLSwIn7GFAR@cluster0.fpb0ptp.mongodb.net/?retryWrites=true&w=majority',
      { dbName: 'mindset' },
    ),
    AuthModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
