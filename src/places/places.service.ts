import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { randomUUID } from 'node:crypto';
import { Place } from './schemas/place.schema';
import { FiltrePagePlaceDto } from './dto/filtre-page-place.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlacesService {
  
  constructor(
    @InjectModel(Place.name) private readonly placeModel: Model<Place>
  ){}

  async create(createPlaceDto: CreatePlaceDto) {
    const newPlace: Partial<Place> = {
      id: `plc_${randomUUID()}`,
      ...createPlaceDto
    }

    return this.placeModel.create(newPlace);
  }

  async findAll(filterPageDto: FiltrePagePlaceDto) {
    const {category, page = 1, limit = 10} = filterPageDto;

    if(limit > 100) throw new BadRequestException("Limit is too high, please put equal or under 100")

    const filter: any = {};
    if(category) filter.category = category;

    const totalItems = await this.placeModel.countDocuments(filter).exec();
    const nbPage = Math.ceil(totalItems / limit);
    if(page > nbPage && totalItems > 0) throw new BadRequestException(`Page given too high! Amount of page: ${nbPage}`);

    const startIndex = (page - 1) * limit;

    const paginatedPlaces = await this.placeModel.find(filter).skip(startIndex).limit(limit).exec();

    return {
      "data": paginatedPlaces,
      "pagination": {
        "page": page,
        "limit": limit,
        "totalItems": totalItems,
        "totalPages": nbPage
      }
    };
  }

  async findOne(id: string): Promise<Place> {
    const toFind = await this.placeModel.findOne({id: id}).exec();

    if(toFind){
      return toFind;
    }else throw new NotFoundException(`No place found, is the id good? Id given: ${id}`)
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto):Promise<Place> {
    const updatedPlace = await this.placeModel.findOneAndUpdate(
      { id: id},
      { $set: updatePlaceDto},
      { returnDocument: 'after'}
    ).exec();

    if (!updatedPlace) throw new NotFoundException(`No place found, is the id good? Id given: ${id}`);

    return updatedPlace;
  }

  async remove(id: string) {
    const toRemove = await this.findOne(id);

    if(toRemove.reviewCount > 0) throw new BadRequestException(`This place has reviews! Delete reviews before the place. Amount of reviews: ${toRemove.reviewCount}`);

    await this.placeModel.deleteOne({id: toRemove.id}).exec();
  }
}
