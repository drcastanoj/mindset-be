import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment, AppointmentDocument } from './appointment.schema';
import { AppointmentDto } from './appointment.dto';
import { ClientService } from 'src/client/client.service';

const HOUR_AVAILABLE = [8, 9, 10, 11, 12];

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
    private clientService: ClientService,
  ) {}

  async createAppointment(appointmentDto: AppointmentDto): Promise<Appointment> {
    const client: any = await this.clientService.findOne(appointmentDto.email);

    if (!client) {
      const newClient: any = await this.clientService.create(appointmentDto);
      appointmentDto.userId = newClient._id;
      console.log(newClient);
    } else {
      appointmentDto.userId = client._id;
    }
    const createdAppointment = new this.appointmentModel(appointmentDto);
    console.log(createdAppointment);
    return createdAppointment.save();
  }

  async getAvailableAppointments(date: string) {
    const appointments = this.appointmentModel.find({
      date: date,
    });
    const schedule = (await appointments).map((a) => a.hour);
    const available = HOUR_AVAILABLE.filter((ap) => !schedule.includes(ap));

    return available;
  }
}
