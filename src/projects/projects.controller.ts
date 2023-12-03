import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { VersionsService } from 'src/versions/versions.service';
import { CreateVersionDto } from 'src/versions/dto/create-version.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly versionsService: VersionsService,
  ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
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
    return this.projectsService.update(+id, updateProjectDto);
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
    @Param('project_id') projectId: string,
    @Body() createVersionDto: CreateVersionDto,
  ) {
    return this.versionsService.create(+projectId, createVersionDto);
  }
}
