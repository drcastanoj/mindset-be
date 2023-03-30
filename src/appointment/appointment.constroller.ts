import { Controller, Get, Param } from '@nestjs/common';

import { AppointmentService } from './appointment.service';

@Controller('/appointment/:date')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Get()
  getAppointment(@Param('date') date) {
    return this.appointmentService.getAvailableAppointments(date);
  }

  // TODO Create POST controller
}
