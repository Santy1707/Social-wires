/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Message } from './messages.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: {
    createdAt: 'created_at', 
    updatedAt: 'updated_at'
} })
export class User {
   @Prop({required: true, unique: true})
   username: string;

   @Prop({required: true})
   email: string

   @Prop({required: true })
   password: string;

   @Prop({required: true})
   fullname: string

   @Prop()
   messages: Message[]
}

export const UserSchema = SchemaFactory.createForClass(User);