import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentDto } from './appointment.dto';

@Controller('/appointment')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Get('/:date')
  getAppointment(@Param('date') date) {
    return this.appointmentService.getAvailableAppointments(date);
  }

  @Post()
  createAppointment(@Body() appointmentDto: AppointmentDto){
    return this.appointmentService.createAppointment(appointmentDto);
  }
}
