import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";
import { CATEGORY, STATE } from "../enum/place-enum";

export class CreatePlaceDto {
    @IsString({message: "The name need to be a string!"})
    name: string;

    @IsString({message: "The description need to be a string!"})
    description: string;

    @IsEnum(CATEGORY, {
        message: `The category need to be a value in the CATEGORY enum! Choice: ${Object.values(CATEGORY).join(', ')}`
    })
    category: CATEGORY;

    @IsString({message: "The address need to be a string!"})
    address: string;

    @IsOptional()
    @IsArray({message: "The services need to be a array!"})
    @IsString({
        each: true,
        message: "The service need to be a string!"
    })
    services?: string[] = [];

    @IsOptional()
    @IsEnum(STATE, {
        message: `The status need to be in the STATE enum! Choice: ${Object.values(STATE).join(', ')}`
    })
    status?: STATE;
}
