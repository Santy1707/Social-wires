import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'mongoose';

@Controller('wires')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  findAll(@Query('name') name: string) {
    return this.usersService.findAll(name);
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.usersService.remove(id);
  }
}
