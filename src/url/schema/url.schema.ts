import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Url extends Document {
    
    @Prop({ required: true})
    originalUrl: string;

    @Prop({ required: true, unique: true })
    shortUrl: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ default: Date.now })
    createdAt: Date
}

export const UrlSchema = SchemaFactory.createForClass(Url)