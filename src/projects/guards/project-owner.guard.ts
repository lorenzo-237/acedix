import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ProjectsService } from '../projects.service';
import { Request } from 'src/acedix/types';

@Injectable()
export class ProjectOwnerGuard implements CanActivate {
  constructor(private readonly projectsService: ProjectsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const project_id = +request.params.project_id;
    const user_id = request.user ? request.user.id : null;

    if (!user_id) {
      throw new ForbiddenException('User is null');
    }

    const isOwner = await this.projectsService.userIsProjectOwner(
      project_id,
      user_id,
    );

    if (!isOwner) {
      throw new ForbiddenException("You're not the owner");
    }

    return true;
  }
}
