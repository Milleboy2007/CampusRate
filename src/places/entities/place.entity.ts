import { ApiProperty } from "@nestjs/swagger";
import { CATEGORY, STATE } from "../enum/place-enum";

export class Place {

    @ApiProperty({ example: 'plc_6a3f1c70-35ef-4d07-b5a5-ce5a40ed3969', description: 'Identifiant unique généré par le serveur' })
    id: string;

    @ApiProperty({ example: 'Bibliothèque principale', description: "Nom de l'endroit" })
    name: string;

    @ApiProperty({ example: 'Espace calme avec prises.', description: 'Description détaillée' })
    description: string;

    @ApiProperty({ enum: CATEGORY, example: CATEGORY.STUDY_SPACE })
    category: CATEGORY;

    @ApiProperty({ example: 'Pavillon A, local A-210' })
    address: string;

    @ApiProperty({ example: ['WIFI', 'POWER_OUTLETS'], required: false })
    services: string[] = [];

    @ApiProperty({ enum: STATE, example: STATE.ACTIVE, required: false })
    status: STATE;

    @ApiProperty({ example: 4.25, type: Number, nullable: true, description: 'Calculé par le serveur' })
    averageRating: number | null;

    @ApiProperty({ example: 12, description: 'Calculé par le serveur' })
    reviewCount: number;

    @ApiProperty({ example: '2026-09-24T18:00:00.000Z', description: "Date et heure de creation" })
    createdAt: Date;

    @ApiProperty({ example: '2026-09-24T18:00:00.000Z', description: "Date et heure de la derniere modification" })
    updatedAt: Date;
}
