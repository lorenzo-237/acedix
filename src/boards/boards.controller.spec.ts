import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardsServiceMock } from './mocks/boards.service.mock';
import { fixedDate, mockBoards } from './mocks/boards.mock';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Request } from 'src/acedix/types';
import { ListsService } from 'src/lists/lists.service';
import { ListsServiceMock } from './mocks/lists.service.mock';

describe('BoardsController', () => {
  let controller: BoardsController;

  // @ts-expect-error only for mock usage
  const mockRequest: Request = {
    user: {
      id: 1,
      email: 'test@test.fr',
      role: 'USER',
    },
  };
  const createdDto: CreateBoardDto = { name: 'Board Test' };
  const updatedDto: UpdateBoardDto = { ...createdDto };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: [
        { provide: BoardsService, useClass: BoardsServiceMock },
        { provide: ListsService, useClass: ListsServiceMock },
      ],
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
      expect(await controller.update(mockRequest, id, updatedDto)).toEqual({
        id: expect.any(Number),
        version_id: 1,
        createdAt: fixedDate,
        createdById: 1,
        updatedAt: fixedDate,
        updatedById: mockRequest.user.id,
        name: updatedDto.name,
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
