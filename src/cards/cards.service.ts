import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  async create(
    user_id: number,
    list_id: number,
    createCardDto: CreateCardDto,
  ): Promise<Card> {
    const lastCard = await this.prisma.card.findFirst({
      select: {
        id: true,
        position: true,
      },
      orderBy: {
        position: 'desc',
      },
    });

    const position = lastCard ? lastCard.position + 1 : 0;

    return this.prisma.card.create({
      data: {
        createdById: user_id,
        updatedById: user_id,
        list_id: list_id,
        position,
        ...createCardDto,
      },
    });
  }

  async findAll(list_id: number): Promise<Card[]> {
    return this.prisma.card.findMany({
      where: {
        list_id,
      },
    });
  }

  async findOne(id: number): Promise<Card> {
    const card = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    return card;
  }

  async update(
    user_id: number,
    id: number,
    updateCardDto: UpdateCardDto,
  ): Promise<Card> {
    const existingCard = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!existingCard) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    return this.prisma.card.update({
      where: { id },
      data: {
        updatedById: user_id,
        ...updateCardDto,
      },
    });
  }

  async remove(id: number): Promise<Card> {
    const existingCard = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!existingCard) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    await this.prisma.card.delete({
      where: { id },
    });

    return existingCard;
  }

  async updateCardPosition(cardId: number, newPosition: number) {
    const card = await this.prisma.card.findUnique({
      where: { id: cardId },
    });

    if (!card) {
      throw new NotFoundException(`Card with id ${cardId} not found`);
    }

    const updatedCard = await this.prisma.card.update({
      where: { id: cardId },
      data: { position: newPosition },
    });

    return updatedCard;
  }
}
