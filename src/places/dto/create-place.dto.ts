import { CATEGORY, STATE } from "../enum/place-enum";

export class CreatePlaceDto {
    name: string;
    description: string;
    category: CATEGORY;
    address: string;
    services?: string[] = [];
    status?: STATE;
}
