import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from 'src/dto/sign.up.dto';
import { LoginUserDto } from 'src/dto/sign.in.dto';
import { JwtService } from '@nestjs/jwt';

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
    return pass === user.password;
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
    return this.usersService.create(user);
  }
}
