import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}

  async create(
    user_id: number,
    version_id: number,
    createBoardDto: CreateBoardDto,
  ): Promise<Board> {
    return this.prisma.board.create({
      data: {
        version_id,
        createdById: user_id,
        updatedById: user_id,
        ...createBoardDto,
      },
    });
  }

  async findAll(version_id: number): Promise<Board[]> {
    return this.prisma.board.findMany({
      where: {
        version_id,
      },
    });
  }

  async findOne(id: number): Promise<Board> {
    const board = await this.prisma.board.findUnique({
      where: { id },
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    return board;
  }

  async update(
    user_id: number,
    id: number,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    const existingBoard = await this.prisma.board.findUnique({
      where: { id },
    });

    if (!existingBoard) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    return this.prisma.board.update({
      where: { id },
      data: { updatedById: user_id, ...updateBoardDto },
    });
  }

  async remove(id: number): Promise<Board> {
    const existingBoard = await this.prisma.board.findUnique({
      where: { id },
    });

    if (!existingBoard) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    await this.prisma.board.delete({
      where: { id },
    });

    return existingBoard;
  }
}
