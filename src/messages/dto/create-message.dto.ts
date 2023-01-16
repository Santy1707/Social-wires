/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsObject, IsOptional, IsString} from 'class-validator';
import { comments, reactions } from 'types/messages.types';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsObject()
  @IsOptional()
  comments: comments;

  @IsObject()
  @IsOptional()
  reactions: reactions;
}
