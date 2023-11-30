import { mockBoards } from './boards.mock';

export class BoardsServiceMock {
  create = jest.fn();
  findAll = jest.fn().mockResolvedValue(mockBoards);
  findOne = jest.fn();
  update = jest.fn();
  remove = jest.fn();
}
