import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { JsonService } from '../json.service';
import { randomUUID } from 'node:crypto';
import { STATE } from './enum/place-enum';
import { Place } from './entities/place.entity';
import { FiltrePagePlaceDto } from './dto/filtre-page-place.dto';

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
      averageRating: null,
      reviewCount: 0,
      createAt: new Date(),
      updatedAt: new Date(),
    }

    await this.jsonService.addToDb(newPlace, "places");
    return newPlace;
  }

  async findAll(filterPageDto: FiltrePagePlaceDto) {
    const {category, page = 1, limit = 10} = filterPageDto;

    if(limit > 100) throw new BadRequestException("Limit is too high, please put equal or under 100")

    let places = await this.jsonService.readOneTab<Place>("places");

    if(category) places = places.filter(place => place.category == category);
    const nbPage = Math.ceil(places.length / limit);
    if(page > nbPage && places.length > 0) throw new BadRequestException(`Page given too high! Amount of page: ${nbPage}`);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedPlaces = places.slice(startIndex, endIndex);

    return {
      "data": paginatedPlaces,
      "pagination": {
        "page": page,
        "limit": limit,
        "totalItems": places.length,
        "totalPages": nbPage
      }
    };
  }

  async findOne(id: string): Promise<Place> {
    const toFind = (await this.jsonService.readOneTab<Place>("places")).find(place => place.id == id);

    if(toFind){
      return toFind;
    }else throw new NotFoundException(`No place found, is the id good? Id given: ${id}`)
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    const places = await this.jsonService.readOneTab<Place>("places");
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

  async remove(id: string) {
    const places = await this.jsonService.readOneTab<Place>("places");
    const deleteAt = places.findIndex(place => place.id == id);

    places.splice(deleteAt, 1);

    return await this.jsonService.updateDB("places", places);
  }
}
