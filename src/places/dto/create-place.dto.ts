import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";
import { CATEGORY, STATE } from "../enum/place-enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePlaceDto {
    @ApiProperty({ example: 'Bibliothèque principale', description: "Nom de l'endroit" })
    @IsString({message: "The name need to be a string!"})
    name: string;

    @ApiProperty({ example: 'Espace calme avec prises.', description: 'Description détaillée' })
    @IsString({message: "The description need to be a string!"})
    description: string;

     @ApiProperty({ enum: CATEGORY, example: CATEGORY.STUDY_SPACE })
    @IsEnum(CATEGORY, {
        message: `The category need to be a value in the CATEGORY enum! Choice: ${Object.values(CATEGORY).join(', ')}`
    })
    category: CATEGORY;

    @ApiProperty({ example: 'Pavillon A, local A-210' })
    @IsString({message: "The address need to be a string!"})
    address: string;

    @ApiProperty({ example: ['WIFI', 'POWER_OUTLETS'], required: false })
    @IsOptional()
    @IsArray({message: "The services need to be a array!"})
    @IsString({
        each: true,
        message: "The service need to be a string!"
    })
    services?: string[] = [];

    @ApiProperty({ enum: STATE, example: STATE.ACTIVE, required: false })
    @IsOptional()
    @IsEnum(STATE, {
        message: `The status need to be in the STATE enum! Choice: ${Object.values(STATE).join(', ')}`
    })
    status?: STATE;
}
