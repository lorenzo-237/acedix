// version-owner.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { VersionsService } from '../versions.service';
import { Request } from 'src/acedix/types';

@Injectable()
export class VersionOwnerGuard implements CanActivate {
  constructor(private readonly versionsService: VersionsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const version_id = +request.params.version_id;
    const user_id = request.user ? request.user.id : null;

    if (!user_id) {
      throw new ForbiddenException('User is null');
    }

    const isProjectOwner = await this.versionsService.userIsProjectOwner(
      version_id,
      user_id,
    );

    if (!isProjectOwner) {
      throw new ForbiddenException(
        "User isn't the project owner of this version",
      );
    }

    return true;
  }
}
