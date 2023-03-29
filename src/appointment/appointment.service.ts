import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment, AppointmentDocument } from './appointment.schema';
import { AppointmentDto } from './appointment.dto';

@Injectable()
export class AppointmentService {
    constructor(@InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>){}

    async createAppointment(createAppointmentDto: AppointmentDto): Promise<Appointment>{
        const createdAppointment = new this.appointmentModel(createAppointmentDto);
        return createdAppointment.save();
    }

    /*async validateEmail(email: string) Promise<any>{
        if()
    }*/
}