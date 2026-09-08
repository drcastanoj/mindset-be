import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { TreatmentDto } from './treatment.dto';

@Controller('/treatment')
export class TreatmentController {
  constructor(private treatmentService: TreatmentService) {}

  @Post()
  createTreatment(@Body() treatmentDto: TreatmentDto) {
    return this.treatmentService.create(treatmentDto);
  }

  @Get('/user/:userId')
  getTreatmentsByUser(@Param('userId') userId: string) {
    return this.treatmentService.findByUserId(userId);
  }

  @Get()
  getAllTreatments() {
    return this.treatmentService.findAll();
  }
}
