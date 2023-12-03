import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { VersionsService } from './versions.service';
import { UpdateVersionDto } from './dto/update-version.dto';
import { ApiTags } from '@nestjs/swagger';
import { BoardsService } from 'src/boards/boards.service';

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
  findAllBoards(@Param('version_id') versionId: string) {
    return this.boardsService.findAll(+versionId);
  }
}
