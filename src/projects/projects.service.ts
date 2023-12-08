import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { PrismaService } from 'nestjs-prisma';
import { NotFoundException } from 'src/acedix/exceptions';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(
    user_id: number,
    createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    return this.prisma.project.create({
      data: {
        createdById: user_id,
        updatedById: user_id,
        ...createProjectDto,
      },
    });
  }

  async findAll(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async update(
    user_id: number,
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const existingProject = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return this.prisma.project.update({
      where: { id },
      data: { updatedById: user_id, ...updateProjectDto },
    });
  }

  async remove(id: number): Promise<Project> {
    const existingProject = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    await this.prisma.project.delete({
      where: { id },
    });

    return existingProject;
  }
}
