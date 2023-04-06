import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema()
export class Appointment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop()
  date: string;

  @Prop()
  hour: number;

  @Prop({ required: false })
  reason: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
