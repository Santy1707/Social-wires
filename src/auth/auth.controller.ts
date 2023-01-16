import { Controller, Post, Body, Delete, Get } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { ObjectId } from 'mongoose';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/signin-auth.dto';
import { RegisterAuthDto } from './dto/signup-auth.dto';

@Controller('wires/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() userBodyRegister: RegisterAuthDto) {
    return this.authService.register(userBodyRegister);
  }

  @Post('signin')
  signin(@Body() userBodyLogin: LoginAuthDto) {
    return this.authService.login(userBodyLogin);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.authService.delete(id);
  }

  @Get('getAll')
  getAll() {
    return this.authService.getAll();
  }
}
