import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JsonService } from '../json.service';
import { Review } from './entities/review.entity';
import { randomUUID } from 'node:crypto';
import { PlacesService } from '../places/places.service';
import { Place } from '../places/entities/place.entity';

@Injectable()
export class ReviewsService {

  constructor(
    private readonly jsonService: JsonService,
    private readonly placesService: PlacesService
  ){}

  private async updatePlaceStats(place: Place){
    const reviews = await this.findAllFor(place.id);
    const places = await this.jsonService.readOneTab<Place>('places');
    const placeIndex = places.findIndex(p => p.id == place.id);
    const nbReviews = reviews.length;

    if(placeIndex != -1){
      places[placeIndex].averageRating = nbReviews > 0 ? Math.round((reviews.reduce((sum, rev) => sum + rev.rating, 0)/nbReviews)*100)/100: null;
      places[placeIndex].reviewCount = nbReviews;
      places[placeIndex].updatedAt = new Date()

      await this.jsonService.updateDB("places", places)
    }
  }

  async create(placeId: string, createReviewDto: CreateReviewDto) {

    const place = await this.placesService.findOne(placeId);

    const newReview: Review = {
      id: `rev_${randomUUID()}`,
      placeId: place.id,
      ...createReviewDto,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await this.jsonService.addToDb(newReview, "reviews");

    await this.updatePlaceStats(place);

    return newReview;
  }

  findAll() {
    return `This action returns all review`;
  }

  async findAllFor(placeId: string){
    const reviews = await this.jsonService.readOneTab<Review>('reviews');
    const place = await this.placesService.findOne(placeId);
    return reviews.filter(rev => rev.placeId == place.id);
  }

  findOne(id: string) {
    return `This action returns a #${id} review`;
  }

  update(id: string, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: string) {
    return `This action removes a #${id} review`;
  }
}
