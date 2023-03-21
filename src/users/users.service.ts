import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign.up.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(user: SignUpDto): Promise<User> {
    return this.userRepository.save(user);
  }

  async updateJwtById(id: number, token: string) {
    return await this.userRepository.update(id, { jwtToken: token });
  }

  async blockUser(username: string) {
    const user = await this.findOne(username);

    return await this.userRepository.update(user.id, { isBlocked: true });
  }
}
