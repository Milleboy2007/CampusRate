import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
    @Prop({required: true, unique: true})
    id: string;

    @Prop({required: true})
    placeId: string

    @Prop({required: true})
    authorName: string;

    @Prop({required: true, min: 1, max: 5})
    rating: number;

    @Prop({required: true})
    comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);