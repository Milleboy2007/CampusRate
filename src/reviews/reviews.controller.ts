import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import type { Response } from 'express';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Review } from './entities/review.entity';

@ApiTags("Reviews")
@Controller()
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post('places/:placeId/reviews')
  @ApiOperation({ summary: 'Publier une appréciation pour un endroit spécifique' })
  @ApiParam({ name: 'placeId', example: 'plc_6a3f1c70-35ef-4d07-b5a5-ce5a40ed3969', description: "Identifiant de l'endroit" })
  @ApiResponse({ status: 201, description: "L'appréciation a été créée avec succès.", type: Review })
  @ApiResponse({ status: 400, description: 'Erreur de validation des données (Problem Details).' })
  @ApiResponse({ status: 404, description: 'Endroit introuvable (Problem Details).' })
  async create(@Param('placeId') placeId: string, @Body() createReviewDto: CreateReviewDto, @Res({passthrough: true}) res: Response) {
    const newReview = await this.reviewService.create(placeId, createReviewDto);
    res.setHeader('Location', `api/v1/reviews/${newReview.id}`)
    return newReview;
  }

  @Get('reviews/')
  @ApiOperation({ summary: "Lister l'ensemble des appréciations du système" })
  @ApiResponse({ status: 200, description: 'Liste globale des appréciations.', type: [Review] })
  findAll() {
    return this.reviewService.findAll();
  }

  @Get('places/:placeId/reviews')
  @ApiOperation({ summary: 'Lister les appréciations associées à un endroit' })
  @ApiParam({ name: 'placeId', example: 'plc_6a3f1c70-35ef-4d07-b5a5-ce5a40ed3969' })
  @ApiResponse({ status: 200, description: "Liste des appréciations de l'endroit.", type: [Review] })
  @ApiResponse({ status: 404, description: 'Endroit introuvable (Problem Details).' })
  findAllFor(@Param('placeId') placeId: string){
    return this.reviewService.findAllFor(placeId);
  }

  @Get('reviews/:id')
  @ApiOperation({ summary: 'Consulter une appréciation spécifique par son ID' })
  @ApiParam({ name: 'id', example: 'rev_33f08a89-b373-48da-8efe-83d2848ca620' })
  @ApiResponse({ status: 200, description: "L'appréciation trouvée.", type: Review })
  @ApiResponse({ status: 404, description: 'Appréciation introuvable (Problem Details).' })
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Patch('reviews/:id')
  @ApiOperation({ summary: 'Modifier partiellement une appréciation' })
  @ApiParam({ name: 'id', example: 'rev_33f08a89-b373-48da-8efe-83d2848ca620' })
  @ApiResponse({ status: 200, description: "L'appréciation a été mise à jour.", type: Review })
  @ApiResponse({ status: 400, description: 'Erreur de validation (Problem Details).' })
  @ApiResponse({ status: 404, description: 'Appréciation introuvable (Problem Details).' })
  async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return await this.reviewService.update(id, updateReviewDto);
  }

  @HttpCode(204)
  @Delete('reviews/:id')
  @ApiOperation({ summary: 'Supprimer une appréciation existante' })
  @ApiParam({ name: 'id', example: 'rev_33f08a89-b373-48da-8efe-83d2848ca620' })
  @ApiResponse({ status: 204, description: "L'appréciation a été supprimée (aucun contenu retourné)." })
  @ApiResponse({ status: 404, description: 'Appréciation introuvable (Problem Details).' })
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
