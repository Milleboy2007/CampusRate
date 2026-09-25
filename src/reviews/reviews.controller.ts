import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import type { Response } from 'express';

@Controller()
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post('places/:placeId/reviews')
  async create(@Param('placeId') placeId: string, @Body() createReviewDto: CreateReviewDto, @Res({passthrough: true}) res: Response) {
    const newReview = await this.reviewService.create(placeId, createReviewDto);
    res.setHeader('Location', `api/v1/reviews/${newReview.id}`)
    return newReview;
  }

  @Get('reviews/')
  findAll() {
    return this.reviewService.findAll();
  }

  @Get('/places/:placeId/reviews')
  findAllFor(@Param('placeId') placeId: string){
    return this.reviewService.findAllFor(placeId);
  }

  @Get('reviews/:id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Patch('reviews/update/:id')
  async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto, @Res({passthrough: true}) res: Response) {
    const updatedReview = await this.reviewService.update(id, updateReviewDto);
    res.setHeader('Location', `api/v1/reviews/${updatedReview.id}`);
    return updatedReview;
  }

  @Delete('reviews/delete/:id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
