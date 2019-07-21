import {
  BoardLevel as BoardLevelType,
  Cursor as CursorType,
  Board as BoardType,
  Direction
} from "../types";
import { default as moveCursorPure } from "./Board/moveCursor";
import { default as trySetTile } from "./Board/trySetTile";
import { newBoardTile } from "./BoardTile";
import { partial } from "lodash";

const BOARD_WIDTH: number = 5;
const BOARD_HEIGHT: number = 5;

interface MoveCursorDeps {
  setCursor: Function;
  cursor: CursorType;
}
const moveCursor: Function = (
  deps: MoveCursorDeps,
  nesw: Direction
): Function => moveCursorPure({ BOARD_HEIGHT, BOARD_WIDTH, ...deps }, nesw);

function getDefaultBoard(): BoardType {
  const a: Function = partial(newBoardTile, " "); //() => newBoardTile(" ");
  const newLevel: Function = (): BoardLevelType =>
    ((n: number): BoardLevelType => {
      let board: BoardLevelType = [];
      for (let i = 0; i < n; i++) {
        board.push([]);
        for (let j = 0; j < n; j++) {
          board[i][j] = a();
        }
      }
      return board;
    })(15);
  return new Map([[0, newLevel()], [1, newLevel()], [2, newLevel()]]);
}

export { getDefaultBoard, moveCursor, trySetTile };
