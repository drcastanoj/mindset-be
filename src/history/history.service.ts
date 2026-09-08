import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { History, HistoryDocument, HistoryType } from './history.schema';
import { HistoryDto } from './history.dto';
import { AppointmentService } from '../appointment/appointment.service';
import { TreatmentService } from '../treatment/treatment.service';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name)
    private historyModel: Model<HistoryDocument>,
    private appointmentService: AppointmentService,
    private treatmentService: TreatmentService,
  ) {}

  async create(historyDto: HistoryDto): Promise<History> {
    const createdHistory = new this.historyModel(historyDto);
    return createdHistory.save();
  }

  async findByUserId(userId: string): Promise<any[]> {
    const appointments = await this.appointmentService.findAppointmentsByUserId(
      userId,
    );
    const treatments = await this.treatmentService.findByUserId(userId);

    const history = [
      ...appointments.map((apt: any) => ({
        type: HistoryType.APPOINTMENT,
        date: new Date(apt.year, apt.month - 1, apt.day, apt.hour),
        data: apt,
      })),
      ...treatments.map((treatment: any) => ({
        type: HistoryType.TREATMENT,
        date: treatment.date,
        data: treatment,
      })),
    ];

    history.sort((a, b) => b.date.getTime() - a.date.getTime());

    return history;
  }

  async findAll(): Promise<History[]> {
    return this.historyModel.find().exec();
  }
}
