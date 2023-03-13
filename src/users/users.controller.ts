import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('api')
export class UserController {
  constructor(private userService: UsersService) {}

  @Get('users')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req) {
    console.log(req.id);
    return await this.userService.findOneById(req.id);
  }
}
