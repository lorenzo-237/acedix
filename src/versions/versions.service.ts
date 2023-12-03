import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { Version } from './entities/version.entity';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class VersionsService {
  constructor(private prisma: PrismaService) {}

  async create(
    project_id: number,
    createVersionDto: CreateVersionDto,
  ): Promise<Version> {
    const createdVersion = await this.prisma.version.create({
      include: {
        project: true,
      },
      data: {
        project_id,
        ...createVersionDto,
      },
    });

    return createdVersion;
  }

  async findAll(project_id: number): Promise<Version[]> {
    const versions = await this.prisma.version.findMany({
      include: {
        project: true,
      },
      where: {
        project_id,
      },
    });
    return versions;
  }

  async findOne(id: number): Promise<Version> {
    const version = await this.prisma.version.findUnique({
      include: {
        project: true,
      },
      where: { id },
    });

    if (!version) {
      throw new NotFoundException(`Version with ID ${id} not found`);
    }

    return version;
  }

  async update(
    id: number,
    updateVersionDto: UpdateVersionDto,
  ): Promise<Version> {
    const existingVersion = await this.prisma.version.findUnique({
      where: { id },
    });

    if (!existingVersion) {
      throw new NotFoundException(`Version with ID ${id} not found`);
    }

    const updatedVersion = await this.prisma.version.update({
      include: {
        project: true,
      },
      where: { id },
      data: updateVersionDto,
    });

    return updatedVersion;
  }

  async remove(id: number): Promise<Version> {
    const existingVersion = await this.prisma.version.findUnique({
      include: {
        project: true,
      },
      where: { id },
    });

    if (!existingVersion) {
      throw new NotFoundException(`Version with ID ${id} not found`);
    }

    await this.prisma.version.delete({
      where: { id },
    });

    return existingVersion;
  }
}
