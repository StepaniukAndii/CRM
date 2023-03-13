import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tokenHeader = request.headers.authorization?.split(' ')[1];
    const tokenQuery = request.query.authorization;
    let token;

    if (!tokenHeader) {
      return false;
    } else if (!tokenQuery) {
      return false;
    }

    const decode = this.jwtService.decode(tokenHeader);
    request.id = decode['id'];

    const user = await this.userService.findOneById(decode['id']);

    if (user.jwtToken === tokenHeader) {
      return true;
    } else {
      return false;
    }
  }
}
