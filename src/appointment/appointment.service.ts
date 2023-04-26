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

  async createAppointment(appointmentDto: AppointmentDto): Promise<Appointment> {
    const user: any = await this.userService.findOne(appointmentDto.email);

    if (!user) {
      const newUser: any = await this.userService.create(appointmentDto);
      appointmentDto.userId = newUser._id;
    } else {
      appointmentDto.userId = user._id;
    }
    const createdAppointment = new this.appointmentModel(appointmentDto);
    console.log(createdAppointment);
    return createdAppointment.save();
  }

  async getAvailableAppointments(day: number, month: number, year: number) {
    const appointments = this.appointmentModel.find({
      day: day,
      month: month,
      year: year
    });
    const schedule = (await appointments).map((a) => a.hour);
    const available = HOUR_AVAILABLE.filter((ap) => !schedule.includes(ap));

    return available;
  }

  async findAppointmentsByMonthAndYear(month: number, year: number) {
    return this.appointmentModel.find({ month: month, year: year }).exec();
  }
}
