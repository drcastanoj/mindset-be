import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment, AppointmentDocument } from './appointment.schema';
import { AppointmentDto } from './appointment.dto';
import { UserService } from 'src/user/user.service';

const HOUR_AVAILABLE = [8, 9, 10, 11, 12];

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
    private userService: UserService,
  ) {}

  async createAppointment(
    createAppointmentDto: AppointmentDto,
  ): Promise<Appointment> {
    const user = this.userService.findOne(createAppointmentDto.email);

    if (user) {
      // TODO Create appointment without email and name but with userId
      const createdAppointment = new this.appointmentModel(
        createAppointmentDto,
      );
      return createdAppointment.save();
    } else {
      // Create user email and name
      // Create appointment
    }
  }

  // date = 05-06-2023
  async getAvailableAppointments(date: string) {
    const appointments = this.appointmentModel.find({
      date: date,
    });
    const schedule = (await appointments).map((a) => a.hour);
    const available = HOUR_AVAILABLE.filter((ap) => !schedule.includes(ap));

    return available;
  }
}
