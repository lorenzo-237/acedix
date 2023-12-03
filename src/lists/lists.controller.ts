import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListsService } from './lists.service';
import { UpdateListDto } from './dto/update-list.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('lists')
@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listsService.update(+id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listsService.remove(+id);
  }
}
