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

  async findAll(): Promise<Place[]> {
    return await this.jsonService.readOne("places");
  }

  async findOne(id: string) {
    const toFind = (await this.findAll()).find(place => place.id == id);

    if(toFind){
      return toFind;
    }else return "[Error 404 Not Found]: No place found, is the id good?"
  }

  update(id: string, updatePlaceDto: UpdatePlaceDto) {
    return `This action updates a #${id} place`;
  }

  remove(id: string) {
    return `This action removes a #${id} place`;
  }
}
