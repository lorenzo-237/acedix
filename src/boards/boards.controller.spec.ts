import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardsServiceMock } from './mocks/boards.service.mock';
import { mockBoards } from './mocks/boards.mock';

describe('BoardsController', () => {
  let controller: BoardsController;

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

  describe('findAll', () => {
    it('should return an array of boards', () => {
      expect(controller.findAll()).resolves.toEqual(mockBoards);
    });
  });
});
