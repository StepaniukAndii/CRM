import { Controller, Get, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('api')
export class UserController {
  constructor(private userService: UsersService) {}

  @Get('users')
  @UseGuards(JwtAuthGuard)
  async profile(@Body() user) {
    return this.userService.findOneById(user.id);
  }
}
