import { IsNotEmpty } from 'class-validator';

export class AppointmentDto {
  userId: string;
  day: number;
  month: number;
  year: number
  hour: number;
  reason: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  pass: string;
}