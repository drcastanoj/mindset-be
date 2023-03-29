import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './appointment.schema';
import { AppointmentService } from './appointment.service';

@Module({
    exports: [AppointmentService],
    imports: [
        MongooseModule.forFeature([{ name: Appointment.name, schema: AppointmentSchema }])
    ],
    controllers: [],
    providers: []
})
export class AppointmentModule {}