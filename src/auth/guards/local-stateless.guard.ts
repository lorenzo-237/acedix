import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalStatelessAuthGuard extends AuthGuard('local') {}
