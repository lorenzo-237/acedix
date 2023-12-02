import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { Board } from '../entities/board.entity';
import { mockBoards } from './boards.mock';

export class BoardsServiceMock {
  create = jest
    .fn()
    .mockImplementation((dto: CreateBoardDto) =>
      Promise.resolve<Board>({ id: Date.now(), ...dto }),
    );
  findAll = jest.fn().mockResolvedValue(mockBoards);
  findOne = jest
    .fn()
    .mockImplementation((id: string) =>
      Promise.resolve(mockBoards.find((board) => board.id === parseInt(id))),
    );
  update = jest.fn().mockImplementation((id: string, dto: UpdateBoardDto) =>
    Promise.resolve({
      id: parseInt(id),
      ...dto,
    }),
  );
  remove = jest.fn().mockResolvedValue({ message: 'board deleted' });
}
