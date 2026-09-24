import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.jsonService.readOneTab("places");
  }

  async findOne(id: string): Promise<Place> {
    const toFind = (await this.findAll()).find(place => place.id == id);

    if(toFind){
      return toFind;
    }else throw new NotFoundException(`No place found, is the id good? Id given: ${id}`)
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    const places = await this.findAll();
    const isAt = places.findIndex(place => place.id == id);

    if(isAt == -1) throw new NotFoundException(`No place found, is the id good? Id given: ${id}`);
    

    const updatedPlace: Place = {
      ...places[isAt],
      ...updatePlaceDto,
      updatedAt: new Date()
    }
    places[isAt] = updatedPlace;

    await this.jsonService.updateDB("places", places);

    return updatedPlace;
  }

  remove(id: string) {
    return `This action removes a #${id} place`;
  }
}
