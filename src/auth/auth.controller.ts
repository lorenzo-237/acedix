import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginLocal(@Req() req: Request) {
    return req.user;
  }

  @Get('protected')
  getHelloProtected(@Req() req: Request) {
    return req.user;
  }
}
