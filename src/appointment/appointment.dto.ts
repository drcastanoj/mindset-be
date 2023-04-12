import { IsNotEmpty } from 'class-validator';

export class AppointmentDto {
  userId: string;
  date: string;
  hour: number;
  reason: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
}
