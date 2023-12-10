import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
  ParseIntPipe,
  ForbiddenException,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { UpdateCardDto } from './dto/update-card.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'src/acedix/types';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    const user_id = req.user ? req.user.id : null;

    if (!user_id) throw new ForbiddenException('User is null');
    return this.cardsService.update(user_id, +id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(+id);
  }

  @Put(':id/position')
  updateCardPosition(
    @Param('id', ParseIntPipe) cardId: number,
    @Body('position', ParseIntPipe) newPosition: number,
  ) {
    return this.cardsService.updateCardPosition(cardId, newPosition);
  }
}
