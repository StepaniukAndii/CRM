import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from 'src/users/dto/sign.up.dto';
import { SignInDto } from 'src/users/dto/sign.in.dto';

import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(credentials: SignInDto): Promise<any> {
    const user = await this.usersService.findOne(credentials.username);
    await this.validationUser(user, credentials);
    const token = await this.updateJwt(user);

    return {
      access_token: token,
    };
  }

  async register(user: SignUpDto): Promise<any> {
    if (user.password !== user.confirm_password) {
      throw new BadRequestException('Passwords are not the same');
    }

    const hashpassword = await bcrypt.hash(user.password, 5);
    await this.usersService
      .create({
        ...user,
        password: hashpassword,
      })
      .catch((e) => {
        console.log(e.detail);
        if (/(already exists)/.test(e.detail)) {
          throw new BadRequestException(
            'Account with this email already exists.',
          );
        }
      });

    return {
      message: ['User registration sucssesffuly'],
    };
  }

  async updateJwt(user: User) {
    const payload = {
      userId: user.id,
    };

    const acsess_token = this.jwtService.sign(payload);
    await this.usersService.updateJwtById(user.id, acsess_token);
    return acsess_token;
  }

  async validationUser(user: User, credentials: SignInDto) {
    if (!user) {
      throw new HttpException(
        {
          error: 'User',
          message: `User not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!bcrypt.compare(credentials.password, user.password)) {
      throw new NotFoundException(`User doesn't exists`);
    }

    if (user.isVerify) {
      throw new HttpException(
        {
          error: 'User',
          message: `User is not verified`,
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }
}
