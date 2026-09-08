import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Treatment, TreatmentDocument } from './treatment.schema';
import { TreatmentDto } from './treatment.dto';

@Injectable()
export class TreatmentService {
  constructor(
    @InjectModel(Treatment.name)
    private treatmentModel: Model<TreatmentDocument>,
  ) {}

  async create(treatmentDto: TreatmentDto): Promise<Treatment> {
    const createdTreatment = new this.treatmentModel(treatmentDto);
    return createdTreatment.save();
  }

  async findByUserId(userId: string): Promise<Treatment[]> {
    return this.treatmentModel.find({ userId }).exec();
  }

  async findAll(): Promise<Treatment[]> {
    return this.treatmentModel.find().exec();
  }
}
