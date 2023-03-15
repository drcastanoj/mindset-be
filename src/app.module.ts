import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://daniel:CLN3ZhLSwIn7GFAR@cluster0.fpb0ptp.mongodb.net/?retryWrites=true&w=majority',
      { dbName: 'mindset' },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
