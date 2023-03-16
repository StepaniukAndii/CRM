import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const body = req.body;
    const user = await this.usersService.findOne(body.username);

    if (user.isBlocked) {
      return false;
    }

    if (!user) {
      throw new UnauthorizedException();
    } else {
      const isMatch = await bcrypt.compare(body.password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      return true;
    }
  }
}
