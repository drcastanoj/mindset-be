import { IsNotEmpty, IsOptional } from 'class-validator';

export class TreatmentDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  date: Date;

  @IsOptional()
  notes?: string;

  @IsOptional()
  diagnosis?: string;
}
