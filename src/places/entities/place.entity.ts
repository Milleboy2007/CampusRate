import { CATEGORY, STATE } from "../enum/place-enum";

export class Place {

    id: string;
    name: string;
    description: string;
    category: CATEGORY;
    address: string;
    services: string[] = [];
    status: STATE;
    averageRating: number;
    reviewCount: number;
    createAt: Date;
    updatedAt: Date;
}
