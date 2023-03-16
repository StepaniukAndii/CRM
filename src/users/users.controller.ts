import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('api/users')
export class UserController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req) {
    return await this.userService.findOneById(req.id);
  }

  @Post('block')
  @UseGuards(JwtAuthGuard)
  async blockUser(@Body() body) {
    console.log(body.username);
    return await this.userService.blockUser(body.username);
  }
}
