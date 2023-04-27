import { IsNotEmpty } from 'class-validator';

export class AppointmentDto {
  userId: string;
  @IsNotEmpty()
  day: number;
  @IsNotEmpty()
  month: number;
  @IsNotEmpty()
  year: number
  @IsNotEmpty()
  hour: number;
  reason: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  pass: string;
}