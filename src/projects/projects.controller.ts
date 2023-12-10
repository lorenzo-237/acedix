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
import { Request } from 'src/acedix/types';
import { AddUserProjectDto } from './dto/add-user-project.dto';
import { ProjectOwnerGuard } from './guards/project-owner.guard';
import { ProjectBelongsToGuard } from './guards/project-belong.guard';

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
    return this.projectsService.create(req.user.id, createProjectDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.projectsService.findAll(req.user.id);
  }

  @UseGuards(ProjectBelongsToGuard)
  @Get(':project_id')
  findOne(@Param('project_id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @UseGuards(ProjectOwnerGuard)
  @Patch(':project_id')
  update(
    @Req() req: Request,
    @Param('project_id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(req.user.id, +id, updateProjectDto);
  }

  @UseGuards(ProjectOwnerGuard)
  @Delete(':project_id')
  remove(@Param('project_id') id: string) {
    return this.projectsService.remove(+id);
  }

  @UseGuards(ProjectBelongsToGuard)
  @Get(':project_id/versions')
  listVersions(@Param('project_id') project_Id: string) {
    return this.versionsService.findAll(+project_Id);
  }

  @UseGuards(ProjectOwnerGuard)
  @Post(':project_id/versions')
  createVersion(
    @Req() req: Request,
    @Param('project_id', ParseIntPipe) project_Id: number,
    @Body() createVersionDto: CreateVersionDto,
  ) {
    return this.versionsService.create(
      req.user.id,
      project_Id,
      createVersionDto,
    );
  }

  @UseGuards(ProjectOwnerGuard)
  @Post(':project_id/users')
  async addUserToProject(
    @Param('project_id', ParseIntPipe) project_id: number,
    @Body() dto: AddUserProjectDto,
  ) {
    this.projectsService.addUsersToProject(project_id, dto.userIds);

    return { message: 'Users saved' };
  }

  @UseGuards(ProjectOwnerGuard)
  @Delete(':project_id/users/:user_id')
  async removeUserFromProject(
    @Param('project_id', ParseIntPipe) project_id: number,
    @Param('user_id', ParseIntPipe) user_id: number,
  ) {
    this.projectsService.removeUserFromProject(project_id, user_id);

    return { message: 'User removed' };
  }
}
