import {
  BadRequestException,
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
      id: findUser.id,
    };

    const acsess_token = this.jwtService.sign(payload);
    await this.usersService.putTokenByUserId(findUser.id, acsess_token);

    return {
      access_token: acsess_token,
    };
  }

  async register(user: CreateUserDto): Promise<any> {
    const findUser = await this.usersService.findOne(user.username);

    if (!findUser) {
      const hashpassword = await bcrypt.hash(user.password, 5);
      const userCreated = this.usersService.create({
        ...user,
        password: hashpassword,
      });

      if (!this.usersService.findOne((await userCreated).username))
        return {
          message: 'User created sucsessfuly',
        };
    } else {
      throw new BadRequestException('User exist');
    }
  }
}
