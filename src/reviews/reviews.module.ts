import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PlacesService } from '../places/places.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Place, PlaceSchema } from '../places/schemas/place.schema';
import { Review, ReviewSchema } from './schemas/review.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: Place.name, schema: PlaceSchema},
      {name: Review.name, schema: ReviewSchema}
    ])
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, PlacesService],
})
export class ReviewsModule {}
