import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ObjectId } from 'mongoose';
import { Request } from 'express';
import { comments, reactions } from 'types/messages.types';

@Controller('wires')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('messages/:id')
  create(
    @Param('id') id: ObjectId,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.messagesService.create(id, createMessageDto);
  }

  @Get('messages')
  findAll() {
    return this.messagesService.findAll();
  }

  @Get('messages/me/user/:id')
  getMyMessages(@Param('id') id: ObjectId) {
    return this.messagesService.findMyMessages(id);
  }

  @Get('messages/me/:id')
  findMessagesById(@Param('id') id: ObjectId) {
    return this.messagesService.findMessagesById(id);
  }

  @Patch('messages/reaction/:id')
  createReaction(@Param('id') id: ObjectId, @Body() createReaction: reactions) {
    return this.messagesService.updateReaction(id, createReaction);
  }

  @Patch('messages/comment/:id')
  createComment(@Param('id') id: ObjectId, @Body() createComment: comments) {
    return this.messagesService.updateComment(id, createComment);
  }

  @Delete('messages/:id')
  remove(@Param('id') id: ObjectId) {
    return this.messagesService.remove(id);
  }
}
