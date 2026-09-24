import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { JsonService } from '../json.service';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService, JsonService],
})
export class PlacesModule {}
