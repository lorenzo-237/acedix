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
    return this.boardsService.update(+id, updateBoardDto);
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
    return this.listsService.create(+board_id, dto);
  }
}
