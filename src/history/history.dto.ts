import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { HistoryType } from './history.schema';

export class HistoryDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsEnum(HistoryType)
  type: HistoryType;

  @IsNotEmpty()
  referenceId: string;

  @IsNotEmpty()
  date: Date;

  @IsOptional()
  description?: string;
}
