import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  UseGuards,
  Req,
  ForbiddenException,
  ParseIntPipe,
} from '@nestjs/common';
import { VersionsService } from './versions.service';
import { UpdateVersionDto } from './dto/update-version.dto';
import { ApiTags } from '@nestjs/swagger';
import { BoardsService } from 'src/boards/boards.service';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'src/acedix/types';
import { VersionOwnerGuard } from './guards/version-owner.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('versions')
@Controller('versions')
export class VersionsController {
  constructor(
    private readonly versionsService: VersionsService,
    private readonly boardsService: BoardsService,
  ) {}

  @UseGuards(VersionOwnerGuard)
  @Get(':version_id')
  findOne(@Param('version_id', ParseIntPipe) id: number) {
    return this.versionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateVersionDto: UpdateVersionDto,
  ) {
    const user_id = req.user ? req.user.id : null;

    if (!user_id) throw new ForbiddenException('User is null');

    return this.versionsService.update(user_id, +id, updateVersionDto);
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
    @Req() req: Request,
    @Param('version_id') version_id: string,
    @Body() dto: CreateBoardDto,
  ) {
    const user_id = req.user ? req.user.id : null;

    if (!user_id) throw new ForbiddenException('User is null');

    return this.boardsService.create(user_id, +version_id, dto);
  }
}
