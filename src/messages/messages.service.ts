import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import convertEmojiToAscii from 'src/helpers/convertToEmoji';
import { Message, MessagesDocument } from 'src/schema/messages.schema';
import { UserDocument, User } from 'src/schema/user.schema';
import { comments, reactions } from 'types/messages.types';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessagesDocument>,
    @InjectModel(User.name) private usuarioModel: Model<UserDocument>,
  ) {}
  async create(id: ObjectId, createMessageDto: CreateMessageDto) {
    try {
      const messageNew = await this.messageModel.create({
        user: id,
        text: createMessageDto.content,
        ...createMessageDto,
      });
      console.log(id);

      await this.usuarioModel.findByIdAndUpdate(
        { _id: id },
        {
          $push: {
            messages: messageNew,
          },
        },
        { new: true },
      );
      return messageNew;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const allMessages = await this.messageModel.find();
      return allMessages;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findMyMessages(id: ObjectId) {
    try {
      const userMessages = await this.usuarioModel.findById(id);
      return userMessages.messages;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findMessagesById(id: ObjectId) {
    try {
      const message = await this.messageModel.findById(id);
      return message;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateReaction(id: ObjectId, createReaction: reactions) {
    try {
      const reactionObj = createReaction;

      reactionObj.reaction = convertEmojiToAscii(createReaction.reaction);

      const message = await this.messageModel.findByIdAndUpdate(
        { _id: id },
        {
          $push: {
            reactions: reactionObj,
          },
        },
        { new: true },
      );
      return message;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateComment(id: ObjectId, createComment: comments) {
    try {
      const message = await this.messageModel.findByIdAndUpdate(
        { _id: id },
        {
          $push: {
            comments: createComment,
          },
        },
        { new: true },
      );
      return message;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: ObjectId) {
    try {
      await this.messageModel.deleteOne({ _id: id });
      return { delete: true, status: 'OK' };
    } catch (error) {
      throw new Error(error);
    }
  }
}
