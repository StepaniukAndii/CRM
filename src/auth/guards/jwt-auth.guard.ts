import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
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
    const tokenHeader = request.headers.crmtoken?.split(' ')[1];
    const tokenQuery = request.query.crmtoken;
    const token = tokenHeader || tokenQuery;

    if (!token) {
      throw new UnauthorizedException();
    }

    const decode = this.jwtService.decode(token);
    request.id = decode['userId'];

    const user = await this.userService.findOneById(decode['userId']);

    if (user.isBlocked) {
      return false;
    }

    if (user.jwtToken === token) {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}
