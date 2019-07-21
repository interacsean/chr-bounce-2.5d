import { Board } from "../types/Board";
import { Piece } from "../types/Piece";

export default function frameTick(
  gameBoard: Board,
  pieces: Array<Piece>
): [Board, Array<Piece>] {
  return [gameBoard, pieces];
}
