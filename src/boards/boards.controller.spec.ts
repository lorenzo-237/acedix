import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardsServiceMock } from './mocks/boards.service.mock';
import { mockBoards } from './mocks/boards.mock';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

describe('BoardsController', () => {
  let controller: BoardsController;

  const createdDto: CreateBoardDto = { name: 'Board Test' };
  const updatedDto: UpdateBoardDto = { ...createdDto };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: [{ provide: BoardsService, useClass: BoardsServiceMock }],
    }).compile();

    controller = module.get<BoardsController>(BoardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a single board', async () => {
      const id = '4';
      expect(await controller.findOne(id)).toEqual(
        mockBoards.find((board) => board.id === parseInt(id)),
      );
    });
  });

  describe('update', () => {
    it('should update a board and return updated payload', async () => {
      const id = '4';
      expect(await controller.update(id, updatedDto)).toEqual({
        id: expect.any(Number),
        ...updatedDto,
      });
    });
  });

  describe('remove', () => {
    it('should return "board deleted"', async () => {
      const id = '5';
      expect(await controller.remove(id)).toEqual({ message: 'board deleted' });
    });
  });
});
