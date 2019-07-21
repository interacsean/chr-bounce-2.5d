import {
  Board as BoardType,
  Piece as PieceType,
  Cursor as CursorType
} from "../../types";

export type Props = {
  board: BoardType;
  pieces: Array<PieceType>;
  cursor: CursorType;
};
