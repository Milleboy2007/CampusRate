import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, HttpCode } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import type { Response } from 'express';
import { FiltrePagePlaceDto } from './dto/filtre-page-place.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Place } from './entities/place.entity';

@ApiTags("Places")
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel endroit' })
  @ApiResponse({ status: 201, description: "L'endroit a été créé avec succès.", type: Place })
  @ApiResponse({ status: 400, description: 'Erreur de validation des données (Problem Details).' })
  async create(@Body() createPlaceDto: CreatePlaceDto, @Res({passthrough: true}) res: Response) {
    const newPlace = await this.placesService.create(createPlaceDto);
    res.setHeader('Location', `api/v1/places/${newPlace.id}`);
    return newPlace;
  }

  @Get()
  @ApiOperation({ summary: 'Lister les endroits avec filtrage et pagination' })
  @ApiResponse({ 
    status: 200, 
    description: 'La liste paginée des endroits.',
    schema: {
      example: {
        data: [{ id: 'plc_6a3f1c70-35ef-4d07-b5a5-ce5a40ed3969', name: 'Bibliothèque principale', category: 'STUDY_SPACE' }],
        pagination: { page: 1, limit: 10, totalItems: 1, totalPages: 1 }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Paramètres de pagination invalides (Problem Details).' })
  async findAll(@Query() filterPageDto: FiltrePagePlaceDto) {
    return await this.placesService.findAll(filterPageDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consulter un endroit spécifique' })
  @ApiParam({ name: 'id', example: 'plc_6a3f1c70-35ef-4d07-b5a5-ce5a40ed3969', description: "L'identifiant de l'endroit" })
  @ApiResponse({ status: 200, description: "L'endroit trouvé.", type: Place })
  @ApiResponse({ status: 404, description: 'Endroit introuvable (Problem Details).' })
  async findOne(@Param('id') id: string) {
    return await this.placesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier partiellement un endroit' })
  @ApiParam({ name: 'id', example: 'plc_6a3f1c70-35ef-4d07-b5a5-ce5a40ed3969' })
  @ApiResponse({ status: 200, description: "L'endroit a été mis à jour.", type: Place })
  @ApiResponse({ status: 400, description: 'Erreur de validation (Problem Details).' })
  @ApiResponse({ status: 404, description: 'Endroit introuvable (Problem Details).' })
  async update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return await this.placesService.update(id, updatePlaceDto);
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un endroit' })
  @ApiParam({ name: 'id', example: 'plc_6a3f1c70-35ef-4d07-b5a5-ce5a40ed3969' })
  @ApiResponse({ status: 204, description: "L'endroit a été supprimé avec succès (aucun contenu retourné)." })
  @ApiResponse({ status: 400, description: "Conflit : L'endroit possède des appréciations (Problem Details)." })
  @ApiResponse({ status: 404, description: 'Endroit introuvable (Problem Details).' })
  async remove(@Param('id') id: string) {
    return await this.placesService.remove(id);
  }
}
