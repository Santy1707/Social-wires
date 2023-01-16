/* eslint-disable prettier/prettier */
import { ObjectId } from 'mongoose';
export type comments = {
    comment: string;
    author: ObjectId;
}

export type reactions = {
    reaction: string
    author: ObjectId
}