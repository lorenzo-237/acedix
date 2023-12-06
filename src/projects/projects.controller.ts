import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { VersionsService } from 'src/versions/versions.service';
import { CreateVersionDto } from 'src/versions/dto/create-version.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserSession } from 'src/auth/session/user-session.entity';

@UseGuards(JwtAuthGuard)
@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly versionsService: VersionsService,
  ) {}

  @Post()
  create(
    @Req() req: Request & { user: UserSession },
    @Body() createProjectDto: CreateProjectDto,
  ) {
    const user_id = req.user ? req.user.id : null;

    if (!user_id) {
      throw new Error('Error user id is null' + user_id);
    }

    return this.projectsService.create(user_id, createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    const user_id = 1;
    return this.projectsService.update(user_id, +id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }

  @Get(':project_id/versions')
  listVersions(@Param('project_id') projectId: string) {
    return this.versionsService.findAll(+projectId);
  }

  @Post(':project_id/versions')
  createVersion(
    @Req() req: Request & { user: UserSession },
    @Param('project_id') projectId: string,
    @Body() createVersionDto: CreateVersionDto,
  ) {
    const user_id = req.user ? req.user.id : null;

    if (!user_id) {
      throw new Error('Error user id is null' + user_id);
    }

    return this.versionsService.create(user_id, +projectId, createVersionDto);
  }
}
