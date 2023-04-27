import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentDto } from './appointment.dto';

@Controller('/appointment')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Get('/Available/:day/:month/:year')
  getAppointment(@Param('day') day, @Param('month') month, @Param('year') year) {
    return this.appointmentService.getAvailableAppointments(day, month, year);
  }

  @Get('/FindByMonthAndYear/:month/:year')
  async getAppointmentsByMonth(@Param('month') month, @Param('year') year) {
    const appointments = await this.appointmentService.findAppointmentsByMonthAndYear(month, year);
    return appointments;
  }

  @Get('/FindByDay/:day/:month/:year')
  async getAppointmentsByDay(@Param('day') day, @Param('month') month, @Param('year') year) {
    const appointments = await this.appointmentService.findAppointmentsByDayAndMonthAndYear(day, month, year);
    return appointments;
  }  

  @Post()
  createAppointment(@Body() appointmentDto: AppointmentDto){
    return this.appointmentService.createAppointment(appointmentDto);
  }
}
