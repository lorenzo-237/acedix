import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SessionAuthGuard } from './guards/session-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LocalStatelessAuthGuard } from './guards/local-stateless.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginLocal(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(LocalStatelessAuthGuard)
  @Post('login/token')
  loginJwt(@Req() req: Request) {
    const user: any = req.user;
    return this.authService.loginJwt(user);
  }

  @UseGuards(SessionAuthGuard)
  @Get('protected/session')
  getProtectedSession(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected/jwt')
  getProtectedJwt(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected/either')
  getProtectedEither(@Req() req: Request) {
    return req.user;
  }
}
