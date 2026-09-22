import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { JsonService } from '../json.service';

@Injectable()
export class PlacesService {
  
  constructor(
    private readonly jsonService: JsonService
  ){}

  async create(createPlaceDto: CreatePlaceDto) {
    return await this.jsonService.write(createPlaceDto);
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
