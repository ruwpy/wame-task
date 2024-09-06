import { IsFutureDate } from '@/decorators/future-date';
import {
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateMatchDto {
  @IsString()
  @IsNotEmpty()
  homeTeam: string;

  @IsString()
  @IsNotEmpty()
  awayTeam: string;

  @IsDateString()
  @IsFutureDate()
  matchDate: string; // "yyyy-mm-dd"

  @IsMilitaryTime()
  matchTime: string; // "hh:mm"
}
