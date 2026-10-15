import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CATEGORY, STATE } from '../enum/place-enum';
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
export class Place extends Document {
    @ApiProperty({ example: 'plc_6a3f1c70-35ef-4d07-b5a5-ce5a40ed3969', description: 'Identifiant unique généré par le serveur' })
    @Prop({required: true, unique: true})
    id: string;

    @Prop({required: true})
    @ApiProperty({ example: 'Bibliothèque principale', description: "Nom de l'endroit" })
    name: string;

    @ApiProperty({ example: 'Espace calme avec prises.', description: 'Description détaillée' })
    @Prop({required: true})
    description: string;

    @ApiProperty({ enum: CATEGORY, example: CATEGORY.STUDY_SPACE })
    @Prop({required: true, enum: CATEGORY})
    category: CATEGORY;

    @ApiProperty({ example: 'Pavillon A, local A-210' })
    @Prop({required: true})
    address: string;

    @ApiProperty({ example: ['WIFI', 'POWER_OUTLETS'], required: false })
    @Prop({type: [String], default: []})
    services: string[];

    @ApiProperty({ enum: STATE, example: STATE.ACTIVE, required: false })
    @Prop({enum: STATE, default: STATE.ACTIVE})
    status: STATE;

    @ApiProperty({ example: 4.25, type: Number, nullable: true, description: 'Calculé par le serveur' })
    @Prop({default: null, type: Number, min: 0, max: 5})
    averageRating: number | null

    @ApiProperty({ example: 12, description: 'Calculé par le serveur' })
    @Prop({default: 0, min: 0})
    reviewCount: number;

    @ApiProperty({ example: '2026-09-24T18:00:00.000Z', description: "Date et heure de creation" })
    createdAt: Date;

    @ApiProperty({ example: '2026-09-24T18:00:00.000Z', description: "Date et heure de la derniere modification" })
    updatedAt: Date;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);