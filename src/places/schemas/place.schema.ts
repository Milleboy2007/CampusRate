import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CATEGORY, STATE } from '../enum/place-enum';

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
    @Prop({required: true, unique: true})
    id: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true, enum: CATEGORY})
    category: CATEGORY;

    @Prop({required: true})
    address: string;

    @Prop({type: [String], default: []})
    services: string[];

    @Prop({enum: STATE, default: STATE.ACTIVE})
    status: STATE;

    @Prop({default: null, type: Number, min: 0, max: 5})
    averageRating: number | null

    @Prop({default: 0, min: 0})
    reviewCount: number;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);