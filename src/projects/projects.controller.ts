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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { VersionsService } from 'src/versions/versions.service';
import { CreateVersionDto } from 'src/versions/dto/create-version.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ForbiddenException } from 'src/acedix/exceptions';
import { Request } from 'src/acedix/types';

@UseGuards(JwtAuthGuard)
@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly versionsService: VersionsService,
  ) {}

  @Post()
  create(@Req() req: Request, @Body() createProjectDto: CreateProjectDto) {
    const user_id = req.user ? req.user.id : null;

    if (!user_id) throw new ForbiddenException('User is null');

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
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const user_id = req.user ? req.user.id : null;

    if (!user_id) throw new ForbiddenException('User is null');

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
    @Req() req: Request,
    @Param('project_id') projectId: string,
    @Body() createVersionDto: CreateVersionDto,
  ) {
    const user_id = req.user ? req.user.id : null;

    if (!user_id) throw new ForbiddenException('User is null');

    return this.versionsService.create(user_id, +projectId, createVersionDto);
  }
}
