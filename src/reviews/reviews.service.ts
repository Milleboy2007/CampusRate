import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './schemas/review.schema';
import { randomUUID } from 'node:crypto';
import { PlacesService } from '../places/places.service';
import { Place } from '../places/schemas/place.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReviewsService {

  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
    @InjectModel(Place.name) private readonly placeModel: Model<Place>,
    private readonly placesService: PlacesService
  ){}

  private async updatePlaceStats(placeId: string){
    const stats = await this.reviewModel.aggregate([
      {$match:{placeId: placeId}},
      {
        $group:{
          _id: '$placeId',
          averageRating: {$avg:'$rating'},
          reviewCount: {$sum: 1}
        }
      }
    ]);

    let newAvg = null;
    let newCount = 0;

    if(stats.length > 0){
      newAvg = Math.round(stats[0].averageRating * 100) / 100;
      newCount = stats[0].reviewCount;
    }

    await this.placeModel.updateOne(
      {id: placeId},
      {
        $set:{
          averageRating: newAvg,
          reviewCount:newCount
        }
      }
    ).exec();
  }

  async create(placeId: string, createReviewDto: CreateReviewDto) {

    const place = await this.placesService.findOne(placeId);

    const newReview: Partial<Review> = {
      id: `rev_${randomUUID()}`,
      placeId: place.id,
      ...createReviewDto
    }

    await this.reviewModel.create(newReview);

    await this.updatePlaceStats(place.id);

    return newReview;
  }

  async findAll(): Promise<Review[]> {
   return await this.reviewModel.find().exec();
  }

  async findAllFor(placeId: string){
    const place = await this.placesService.findOne(placeId);
    return this.reviewModel.find({placeId: place.id})
  }

  async findOne(id: string): Promise<Review> {
    const toFind = await this.reviewModel.findOne({id: id});

    if(toFind){
      return toFind;
    }else throw new NotFoundException(`No review found, is the id good? Id given: ${id}`);
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const updatedReview = await this.reviewModel.findOneAndUpdate(
      {id:id},
      {$set:updateReviewDto},
      {returnDocument: 'after'}
    ).exec();

    if(!updatedReview) throw new NotFoundException(`No review found, is the id good? Id given: ${id}`);

    await this.updatePlaceStats(updatedReview.placeId);

    return updatedReview;
  }

  async remove(id: string) {
    const review = await this.findOne(id);
    await this.reviewModel.deleteOne({id: review.id}).exec();
    await this.updatePlaceStats(review.placeId);
  }
}
