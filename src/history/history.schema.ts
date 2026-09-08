import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type HistoryDocument = HydratedDocument<History>;

export enum HistoryType {
  APPOINTMENT = 'appointment',
  TREATMENT = 'treatment',
}

@Schema({ timestamps: true })
export class History {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ required: true, enum: HistoryType })
  type: HistoryType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, refPath: 'type' })
  referenceId: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: false })
  description: string;
}

export const HistorySchema = SchemaFactory.createForClass(History);
