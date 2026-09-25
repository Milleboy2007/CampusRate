import { ApiProperty } from "@nestjs/swagger";

export class Review {
    @ApiProperty({ example: 'rev_33f08a89-b373-48da-8efe-83d2848ca620', description: 'Identifiant unique généré par le serveur' })
    id: string;

    @ApiProperty({ example: 'plc_6a3f1c70-35ef-4d07-b5a5-ce5a40ed3969', description: 'Identifiant de l\'endroit associé' })
    placeId: string;

    @ApiProperty({ example: 'Nitro', description: "Nom ou pseudonyme de l'auteur" })
    authorName: string;

    @ApiProperty({ example: 4, description: 'Note attribuée, de 1 à 5' })
    rating: number;

    @ApiProperty({ example: 'Calme et Wi-Fi stable.', description: "Commentaire textuel de l'appréciation" })
    comment: string;

    @ApiProperty({ example: '2026-09-24T18:00:00.000Z' })
    createdAt: Date;

    @ApiProperty({ example: '2026-09-24T18:00:00.000Z' })
    updatedAt: Date;
}
