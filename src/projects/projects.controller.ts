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
  ParseIntPipe,
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
import { AddUserProjectDto } from './dto/add-user-project.dto';

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
  listVersions(@Param('project_id') project_Id: string) {
    return this.versionsService.findAll(+project_Id);
  }

  @Post(':project_id/versions')
  createVersion(
    @Req() req: Request,
    @Param('project_id') project_Id: string,
    @Body() createVersionDto: CreateVersionDto,
  ) {
    const user_id = req.user ? req.user.id : null;

    if (!user_id) throw new ForbiddenException('User is null');

    return this.versionsService.create(user_id, +project_Id, createVersionDto);
  }

  @Post(':project_id/users')
  async addUserToProject(
    @Req() req: Request,
    @Param('project_id', ParseIntPipe) project_id: number,
    @Body() dto: AddUserProjectDto,
  ) {
    const user_id = req.user ? req.user.id : null;

    if (!user_id) throw new ForbiddenException('User is null');

    const isOwner = await this.projectsService.userIsProjectOwner(
      project_id,
      user_id,
    );

    if (!isOwner) throw new ForbiddenException("You're not the owner");

    this.projectsService.addUsersToProject(project_id, dto.userIds);

    return { message: 'Users saved' };
  }

  @Delete(':project_id/users/:user_id')
  async removeUserFromProject(
    @Req() req: Request,
    @Param('project_id', ParseIntPipe) project_id: number,
    @Param('user_id', ParseIntPipe) user_id: number,
  ) {
    const auth_id = req.user ? req.user.id : null;

    if (!auth_id) throw new ForbiddenException('User is null');

    const isOwner = await this.projectsService.userIsProjectOwner(
      project_id,
      auth_id,
    );

    if (!isOwner) throw new ForbiddenException("You're not the owner");

    this.projectsService.removeUserFromProject(project_id, user_id);

    return { message: 'User removed' };
  }
}
