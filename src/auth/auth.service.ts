import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/sign.in.dto';
import { CreateUserDto } from 'src/users/dto/sign.up.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<boolean> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      return false;
    }
    return bcrypt.compare(pass, user.password);
  }

  async login(user: LoginUserDto): Promise<any> {
    const findUser = await this.usersService.findOne(user.username);

    const payload = {
      username: findUser.username,
      id: findUser.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto): Promise<User> {
    const hashpassword = await bcrypt.hash(user.password, 5);

    return this.usersService.create({ ...user, password: hashpassword });
  }
}
