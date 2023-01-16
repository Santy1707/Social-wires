/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { comments, reactions } from 'types/messages.types';

export type MessagesDocument = HydratedDocument<Message>;

@Schema({ versionKey: false, timestamps: {
    createdAt: 'created_at', 
    updatedAt: 'updated_at'
} })
export class Message {
   @Prop({ type: mongoose.Types.ObjectId})
   user: string;

   @Prop()
   title: string;

   @Prop()
   text: string;

   @Prop()
   comments: comments[]

   @Prop()
   reactions: reactions[]
}

export const MessageSchema = SchemaFactory.createForClass(Message);
