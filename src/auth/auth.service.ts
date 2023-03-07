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

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<boolean> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      return false;
    }
    return pass === user.password;
  }

  async login(user: LoginUserDto): Promise<User> {
    if (await this.validateUser(user.username, user.password)) {
      return await this.usersService.findOne(user.username);
    } else {
      throw new UnauthorizedException('Pass or email not correct');
    }
  }

  async register(user: CreateUserDto): Promise<User> {
    return this.usersService.create(user);
  }
}
