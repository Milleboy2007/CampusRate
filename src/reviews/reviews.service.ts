import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(): Promise<Review[]> {
    return await this.jsonService.readOneTab<Review>('reviews');
  }

  async findAllFor(placeId: string){
    const reviews = await this.jsonService.readOneTab<Review>('reviews');
    const place = await this.placesService.findOne(placeId);
    return reviews.filter(rev => rev.placeId == place.id);
  }

  async findOne(id: string): Promise<Review> {
    const toFind = (await this.findAll()).find(rev => rev.id == id);

    if(toFind){
      return toFind;
    }else throw new NotFoundException(`No review found, is the id good? Id given: ${id}`);
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const reviews = await this.findAll();
    const isAt = reviews.findIndex(rev => rev.id == id);

    if(isAt == -1) throw new NotFoundException(`No review found, is the id good? Id given: ${id}`);

    const updatedReview: Review = {
      ...reviews[isAt],
      ...updateReviewDto,
      updatedAt: new Date()
    }

    reviews[isAt] = updatedReview;

    await this.jsonService.updateDB('reviews', reviews);

    await this.updatePlaceStats(await this.placesService.findOne(reviews[isAt].placeId))

    return updatedReview;
  }

  async remove(id: string) {
    const reviews = await this.findAll();
    const review = await this.findOne(id);
    const deleteAt = reviews.findIndex(rev => rev.id == review.id);
    const placeId = reviews[deleteAt].placeId;

    reviews.splice(deleteAt, 1);

    await this.jsonService.updateDB("reviews", reviews);
    await this.updatePlaceStats(await this.placesService.findOne(placeId));
  }
}
