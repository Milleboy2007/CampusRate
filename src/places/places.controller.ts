import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import type { Response } from 'express';
import { FiltrePagePlaceDto } from './dto/filtre-page-place.dto';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  async create(@Body() createPlaceDto: CreatePlaceDto, @Res({passthrough: true}) res: Response) {
    const newPlace = await this.placesService.create(createPlaceDto);
    res.setHeader('Location', `api/v1/places/${newPlace.id}`);
    return newPlace;
  }

  @Get()
  async findAll(@Query() filterPageDto: FiltrePagePlaceDto) {
    return await this.placesService.findAll(filterPageDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.placesService.findOne(id);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto, @Res({passthrough: true}) res: Response) {
    const updatedPlace = await this.placesService.update(id, updatePlaceDto);
    res.setHeader('Location', `api/v1/places/${updatedPlace.id}`);
    return updatedPlace;
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.placesService.remove(id);
  }
}
