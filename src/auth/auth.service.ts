import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/signin-auth.dto';
import { RegisterAuthDto } from './dto/signup-auth.dto';
import { basicCrypt, compareToEncrypted } from '../helpers/crypting';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/schema/user.schema';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private usuarioModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(userObject: RegisterAuthDto) {
    try {
      const { email } = userObject;
      const userExists = await this.usuarioModel.findOne({ email: email });
      if (userExists) {
        return `El Usuario con el email: ${email} ya existe`;
      }
      const { password } = userObject;
      const passwordToHash = await basicCrypt(password);
      userObject = { ...userObject, password: passwordToHash };
      const userCreated = this.usuarioModel.create(userObject);
      (await userCreated).set('password', undefined, { stric: false });
      return userCreated;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(loginObject: LoginAuthDto) {
    try {
      const { username, password } = loginObject;
      const userExists = await this.usuarioModel.findOne({
        username: username,
      });
      if (!userExists) {
        return new HttpException('USUARIO_INEXISTENTE', 404);
      }
      console.log(password);
      const hashPassword = await this.usuarioModel
        .findOne({
          username: username,
        })
        .select('password');
      const checkPassword = await compareToEncrypted(
        password,
        hashPassword.password,
      );
      if (!checkPassword) {
        return new HttpException('CONTRASEÑA_INCORRECTA', 403);
      }
      const ocultPassword = userExists.set('password', undefined, {
        stric: false,
      });
      const payload = { id: userExists._id, email: userExists.email };
      const token = this.jwtService.sign(payload);
      const data = {
        acces_token: token,
        message: `Succesfully logged in`,
        status: true,
      };
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id: ObjectId) {
    const deleted = await this.usuarioModel.deleteOne({ _id: id });
    return `Usuario eliminado`;
  }

  async getAll() {
    const allUsers = await this.usuarioModel.find({});
    return allUsers;
  }
}
