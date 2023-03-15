import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, MongooseModule.forRoot('', { dbName: 'mindset' })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
