import { IsOptional, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CATEGORY } from '../enum/place-enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FiltrePagePlaceDto {
  @ApiPropertyOptional({
    enum: CATEGORY,
    description: 'Filtrer par catégorie exacte',
    example: CATEGORY.STUDY_SPACE
  })
  @IsOptional()
  @IsEnum(CATEGORY)
  category?: CATEGORY;

  @ApiPropertyOptional({ 
    description: 'Numéro de la page demandée',
    example: 1,
    minimum: 1,
    default: 1 
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ 
    description: "Taille de la page (nombre d'éléments maximum)",
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}