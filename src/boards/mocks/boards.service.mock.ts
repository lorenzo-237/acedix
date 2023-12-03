import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { Board } from '../entities/board.entity';
import { mockBoards } from './boards.mock';

export class BoardsServiceMock {
  create = jest
    .fn()
    .mockImplementation((version_id: number, dto: CreateBoardDto) =>
      Promise.resolve<Board>({ id: Date.now(), version_id, ...dto }),
    );
  findAll = jest
    .fn()
    .mockImplementation((version_id: number) =>
      Promise.resolve(
        mockBoards.find((board) => board.version_id === version_id),
      ),
    );
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
