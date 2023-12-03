import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
} from '@nestjs/common';
import { VersionsService } from './versions.service';
import { UpdateVersionDto } from './dto/update-version.dto';
import { ApiTags } from '@nestjs/swagger';
import { BoardsService } from 'src/boards/boards.service';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';

@ApiTags('versions')
@Controller('versions')
export class VersionsController {
  constructor(
    private readonly versionsService: VersionsService,
    private readonly boardsService: BoardsService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.versionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVersionDto: UpdateVersionDto) {
    return this.versionsService.update(+id, updateVersionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.versionsService.remove(+id);
  }

  @Get(':version_id/boards')
  findAllBoards(@Param('version_id') version_id: string) {
    return this.boardsService.findAll(+version_id);
  }

  @Post(':version_id/boards')
  createNewBoard(
    @Param('version_id') version_id: string,
    @Body() dto: CreateBoardDto,
  ) {
    return this.boardsService.create(+version_id, dto);
  }
}
