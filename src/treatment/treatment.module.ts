import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TreatmentController } from './treatment.controller';
import { Treatment, TreatmentSchema } from './treatment.schema';
import { TreatmentService } from './treatment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Treatment.name, schema: TreatmentSchema },
    ]),
  ],
  controllers: [TreatmentController],
  providers: [TreatmentService],
  exports: [TreatmentService],
})
export class TreatmentModule {}
