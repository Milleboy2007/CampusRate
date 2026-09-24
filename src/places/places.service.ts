import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { JsonService } from '../json.service';
import { randomUUID } from 'node:crypto';
import { STATE } from './enum/place-enum';
import { Place } from './entities/place.entity';

@Injectable()
export class PlacesService {
  
  constructor(
    private readonly jsonService: JsonService
  ){}

  async create(createPlaceDto: CreatePlaceDto) {
    const newPlace: Place = {
      id: randomUUID(),
      services: createPlaceDto.services || [],
      status: createPlaceDto.status || STATE.ACTIVE,
      ...createPlaceDto,
      averageRating: 0,
      reviewCount: 0,
      createAt: new Date(),
      updatedAt: new Date(),
    }

    await this.jsonService.addToDb(newPlace, "places");
    return newPlace;
  }

  findAll() {
    return `This action returns all places`;
  }

  findOne(id: number) {
    return `This action returns a #${id} place`;
  }

  update(id: number, updatePlaceDto: UpdatePlaceDto) {
    return `This action updates a #${id} place`;
  }

  remove(id: number) {
    return `This action removes a #${id} place`;
  }
}
