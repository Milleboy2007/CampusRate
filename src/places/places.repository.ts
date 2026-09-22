// import { Place } from "./entities/place.entity";
// import { CreatePlaceDto } from "./dto/create-place.dto";
// import { UpdatePlaceDto } from "./dto/update-place.dto";
// import { Injectable } from "@nestjs/common";
// import { JsonService } from "../json.service";

// @Injectable()
// export class PlaceRepository {

//     constructor(
//         private jsonService: JsonService
//     ){}

//   async findAll(): Promise<Place[]> {
//     return this.jsonService.readAll()
//   }

//   async findById(id: string): Promise<Place | null> {

//   }

//   async create(data: CreatePlaceDto): Promise<Place> {

//   }

//   async update(id: string, data: UpdatePlaceDto): Promise<Place | null> {
//   }

//   async remove(id: string): Promise<Place | null> {
//   }
// }