import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Place, PlaceSchema } from './schemas/place.schema';
import { Review, ReviewSchema } from '../reviews/schemas/review.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: Place.name, schema: PlaceSchema},
      {name: Review.name, schema: ReviewSchema}
    ])
  ],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
