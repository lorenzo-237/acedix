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
import { VersionBelongGuard } from './guards/version-belong.guard';
import { VersionOwnerGuard } from './guards/version-owner.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('versions')
@Controller('versions')
export class VersionsController {
  constructor(
    private readonly versionsService: VersionsService,
    private readonly boardsService: BoardsService,
  ) {}

  @UseGuards(VersionBelongGuard)
  @Get(':version_id')
  findOne(@Param('version_id', ParseIntPipe) id: number) {
    return this.versionsService.findOne(+id);
  }

  @UseGuards(VersionOwnerGuard)
  @Patch(':version_id')
  update(
    @Req() req: Request,
    @Param('version_id', ParseIntPipe) id: number,
    @Body() updateVersionDto: UpdateVersionDto,
  ) {
    const user_id = req.user ? req.user.id : null;

    if (!user_id) throw new ForbiddenException('User is null');

    return this.versionsService.update(user_id, +id, updateVersionDto);
  }

  @UseGuards(VersionOwnerGuard)
  @Delete(':version_id')
  remove(@Param('version_id', ParseIntPipe) id: number) {
    return this.versionsService.remove(+id);
  }

  @UseGuards(VersionBelongGuard)
  @Get(':version_id/boards')
  findAllBoards(@Param('version_id', ParseIntPipe) version_id: number) {
    return this.boardsService.findAll(+version_id);
  }

  @UseGuards(VersionOwnerGuard)
  @Post(':version_id/boards')
  createNewBoard(
    @Req() req: Request,
    @Param('version_id', ParseIntPipe) version_id: number,
    @Body() dto: CreateBoardDto,
  ) {
    const user_id = req.user ? req.user.id : null;

    if (!user_id) throw new ForbiddenException('User is null');

    return this.boardsService.create(user_id, +version_id, dto);
  }
}
