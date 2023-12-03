import { Board } from 'src/boards/entities/board.entity';

export class List {
  id: number;
  title: string;
  board_id: number;
  board?: Board;
}
