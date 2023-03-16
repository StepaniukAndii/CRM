import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/sign.up.dto';
import { LoginUserDto } from 'src/users/dto/sign.in.dto';

import { UsersService } from '../users/users.service';

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

    if (findUser) {
      throw new BadRequestException('User exist');
    }

    if (user.password !== user.confirm_password) {
      throw new BadRequestException('Password not same');
    }

    const hashpassword = await bcrypt.hash(user.password, 5);
    const userCreated = await this.usersService.create({
      ...user,
      password: hashpassword,
    });
    const userAfterCreted = this.usersService.findOne(userCreated.username);

    if (userAfterCreted) {
      return {
        message: 'User created sucsessfuly',
      };
    }
  }
}
