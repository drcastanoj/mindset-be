import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryController } from './history.controller';
import { History, HistorySchema } from './history.schema';
import { HistoryService } from './history.service';
import { AppointmentModule } from '../appointment/appointment.module';
import { TreatmentModule } from '../treatment/treatment.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }]),
    AppointmentModule,
    TreatmentModule,
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
