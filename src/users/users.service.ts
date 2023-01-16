import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usuarioModel: Model<UserDocument>,
  ) {}

  async findAll(name: string) {
    try {
      if (name) {
        const user = await this.usuarioModel.findOne({ name: name });
        return user ? user : `Sin resultados de busqueda para ${name}`;
      }
      const allUsers = await this.usuarioModel.find({ IsBanned: false });
      return allUsers.length
        ? allUsers
        : new HttpException('NO_HAY_USUARIOS', 403);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: ObjectId) {
    try {
      const userFind = await this.usuarioModel.findById(id);
      if (!userFind) {
        return new HttpException('USUARIO_INEXISTENTE', 404);
      }
      return userFind;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: ObjectId, updateUsuarioDto: UpdateUserDto) {
    try {
      const userToUpdate = await this.usuarioModel.findById(id);
      if (userToUpdate) {
        const userUpdated = await this.usuarioModel.updateOne(
          { _id: id },
          updateUsuarioDto,
          { new: true },
        );
        return userUpdated;
      } else {
        return new HttpException('USUARIO_INEXISTENTE', 404);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: ObjectId) {
    try {
      await this.usuarioModel.deleteOne(id);
      return 'Usuario eliminado';
    } catch (error) {
      throw new Error(error);
    }
  }
}
