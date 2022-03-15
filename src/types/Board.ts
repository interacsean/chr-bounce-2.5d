import { BoardLevel } from './BoardLevel';
import { Piece } from './Piece';

export type Board = {
  levels: Map<number, BoardLevel>,
  pieces: Array<Piece>,
};
