import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";

@Schema({ 
    timestamps: true,
    toJSON: {
        transform: (doc, toReturn) => {
            delete (toReturn as any)._id;
            delete (toReturn as any).__v;
            return toReturn;
        }
    }
 })
export class Review extends Document {
    @ApiProperty({ example: 'rev_33f08a89-b373-48da-8efe-83d2848ca620', description: 'Identifiant unique généré par le serveur' })
    @Prop({required: true, unique: true})
    id: string;

    @ApiProperty({ example: 'plc_6a3f1c70-35ef-4d07-b5a5-ce5a40ed3969', description: 'Identifiant de l\'endroit associé' })
    @Prop({required: true})
    placeId: string

    @ApiProperty({ example: 'Nitro', description: "Nom ou pseudonyme de l'auteur" })
    @Prop({required: true})
    authorName: string;

    @ApiProperty({ example: 4, description: 'Note attribuée, de 1 à 5' })
    @Prop({required: true, min: 1, max: 5})
    rating: number;

    @ApiProperty({ example: 'Calme et Wi-Fi stable.', description: "Commentaire textuel de l'appréciation" })
    @Prop({required: true})
    comment: string;

    @ApiProperty({ example: '2026-09-24T18:00:00.000Z' })
    createdAt: Date;

    @ApiProperty({ example: '2026-09-24T18:00:00.000Z' })
    updatedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);