import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentDto, DateDto, FindByMonthAndYearDto } from './appointment.dto';

@Controller('/appointment')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Get('/Available')
  getAppointment(@Body() date: DateDto) {
    return this.appointmentService.getAvailableAppointments(date.day, date.month, date.year);
  }

  @Get('/FindByMonthAndYear')
  async getAppointmentsByMonth(@Body() monthAndYear: FindByMonthAndYearDto) {
    const appointments = await this.appointmentService.findAppointmentsByMonthAndYear(monthAndYear.month, monthAndYear.year);
    return appointments;
  }

  @Post()
  createAppointment(@Body() appointmentDto: AppointmentDto){
    return this.appointmentService.createAppointment(appointmentDto);
  }
}
