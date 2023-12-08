import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Post,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { UpdateListDto } from './dto/update-list.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'src/acedix/types';
import { ForbiddenException } from 'src/acedix/exceptions';
import { CardsService } from 'src/cards/cards.service';
import { CreateCardDto } from 'src/cards/dto/create-card.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('lists')
@Controller('lists')
export class ListsController {
  constructor(
    private readonly listsService: ListsService,
    private readonly cardsService: CardsService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    const user_id = 1;
    return this.listsService.update(user_id, +id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listsService.remove(+id);
  }

  @Get(':list_id/cards')
  findAllCards(@Param('list_id') list_id: string) {
    return this.cardsService.findAll(+list_id);
  }

  @Post(':list_id/cards')
  createNewCard(
    @Req() req: Request,
    @Param('list_id') list_id: string,
    @Body() dto: CreateCardDto,
  ) {
    const user_id = req.user ? req.user.id : null;

    if (!user_id) throw new ForbiddenException('User is null');

    return this.cardsService.create(user_id, +list_id, dto);
  }
}
