import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity'; // Assurez-vous d'importer le modèle List
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ListsService {
  constructor(private prisma: PrismaService) {}

  async create(
    user_id: number,
    board_id: number,
    dto: CreateListDto,
  ): Promise<List> {
    return this.prisma.list.create({
      data: {
        board_id,
        createdById: user_id,
        updatedById: user_id,
        ...dto,
      },
    });
  }

  async findAll(board_id: number): Promise<List[]> {
    return this.prisma.list.findMany({
      where: {
        board_id,
      },
    });
  }

  async findOne(id: number): Promise<List> {
    const list = await this.prisma.list.findUnique({
      where: { id },
    });

    if (!list) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }

    return list;
  }

  async update(user_id: number, id: number, dto: UpdateListDto): Promise<List> {
    const existingList = await this.prisma.list.findUnique({
      where: { id },
    });

    if (!existingList) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }

    return this.prisma.list.update({
      where: { id },
      data: {
        updatedById: user_id,
        ...dto,
      },
    });
  }

  async remove(id: number): Promise<List> {
    const existingList = await this.prisma.list.findUnique({
      where: { id },
    });

    if (!existingList) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }

    await this.prisma.list.delete({
      where: { id },
    });

    return existingList;
  }
}
