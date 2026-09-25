import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { JsonService } from '../json.service';
import { PlacesService } from '../places/places.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, JsonService, PlacesService],
})
export class ReviewsModule {}
