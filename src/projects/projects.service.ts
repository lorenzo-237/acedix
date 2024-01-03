import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { PrismaService } from 'nestjs-prisma';
import { formatPrismaProject } from './utils';
import { findAllUserProjects, findOneProject } from './shortcuts';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(
    user_id: number,
    createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    const project = await this.prisma.project.create({
      data: {
        createdById: user_id,
        updatedById: user_id,
        ...createProjectDto,
      },
    });

    await this.prisma.userProject.create({
      data: {
        belongs: true,
        lastDate: new Date(),
        owner: true,
        project_id: project.id,
        user_id,
      },
    });

    return project;
  }

  // TODO : relire car Yuni m'embete mdr
  async findAll(user_id: number): Promise<Project[]> {
    const items = await findAllUserProjects(this.prisma, user_id);

    const projects = await Promise.all(
      items.map((item) => formatPrismaProject(item, user_id)),
    );

    return projects;
  }

  async findOne(project_id: number, user_id: number): Promise<any> {
    const item = await findOneProject(this.prisma, user_id, project_id);

    if (!item) {
      throw new NotFoundException(`Project with ID ${project_id} not found`);
    }

    return formatPrismaProject(item, user_id);
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

  async userIsProjectOwner(
    project_id: number,
    user_id: number,
  ): Promise<boolean> {
    const item = await this.prisma.userProject.findFirst({
      where: {
        project_id,
        user_id,
        owner: true,
      },
    });

    return item !== undefined && item !== null;
  }

  async userBelongsToProject(
    project_id: number,
    user_id: number,
  ): Promise<boolean> {
    const item = await this.prisma.userProject.findFirst({
      where: {
        project_id,
        user_id,
        belongs: true,
      },
    });

    return item !== undefined && item !== null;
  }

  async addUsersToProject(projectId: number, userIds: number[]): Promise<void> {
    // Vérifie d'abord si le projet existe
    const existingProject = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!existingProject) {
      throw new Error("Le projet n'existe pas.");
    }

    const promises = userIds.map(async (userId) => {
      const existingUser = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!existingUser) return;

      await this.prisma.userProject.upsert({
        where: {
          user_id_project_id: {
            project_id: projectId,
            user_id: userId,
          },
        },
        update: {
          belongs: true,
          lastDate: new Date(),
        },
        create: {
          user_id: userId,
          project_id: projectId,
          belongs: true,
          owner: false,
          lastDate: new Date(),
        },
      });
    });

    await Promise.all(promises);
  }

  async removeUserFromProject(
    projectId: number,
    userId: number,
  ): Promise<void> {
    // Vérifie d'abord si l'utilisateur appartient au projet
    const existingUserProject = await this.prisma.userProject.findFirst({
      where: {
        user_id: userId,
        project_id: projectId,
        belongs: true,
      },
    });

    if (!existingUserProject) {
      // throw new Error('Cet utilisateur ne fait pas partie de ce projet.');
      return;
    }

    // Met à jour l'enregistrement pour retirer l'utilisateur du projet
    await this.prisma.userProject.update({
      where: {
        user_id_project_id: {
          user_id: userId,
          project_id: projectId,
        },
      },
      data: {
        belongs: false,
      },
    });
  }
}
