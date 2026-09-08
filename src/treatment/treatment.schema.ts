import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TreatmentDocument = HydratedDocument<Treatment>;

@Schema({ timestamps: true })
export class Treatment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: false })
  notes: string;

  @Prop({ required: false })
  diagnosis: string;
}

export const TreatmentSchema = SchemaFactory.createForClass(Treatment);
