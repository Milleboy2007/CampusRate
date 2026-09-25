import { IsOptional, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CATEGORY } from '../enum/place-enum';

export class FiltrePagePlaceDto {
  @IsOptional()
  @IsEnum(CATEGORY)
  category?: CATEGORY;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}