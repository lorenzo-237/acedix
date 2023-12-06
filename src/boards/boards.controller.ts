import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiTags } from '@nestjs/swagger';
import { ListsService } from 'src/lists/lists.service';
import { CreateListDto } from 'src/lists/dto/create-list.dto';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly listsService: ListsService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    const user_id = 1;
    return this.boardsService.update(user_id, +id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(+id);
  }

  @Get(':board_id/lists')
  findAllLists(@Param('board_id') board_id: string) {
    return this.listsService.findAll(+board_id);
  }

  @Post(':board_id/lists')
  createNewList(
    @Param('board_id') board_id: string,
    @Body() dto: CreateListDto,
  ) {
    const user_id = 1;
    return this.listsService.create(user_id, +board_id, dto);
  }
}
