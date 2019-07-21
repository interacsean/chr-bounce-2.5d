import { Cursor as CursorType, SideEffect, Direction } from "../../types/";
import { noop } from "lodash";

interface MoveCursorDeps {
  setCursor: Function;
  cursor: CursorType;
  BOARD_WIDTH: number;
  BOARD_HEIGHT: number;
}

export default function moveCursor(
  { setCursor, cursor, BOARD_WIDTH, BOARD_HEIGHT }: MoveCursorDeps,
  nesw: number
): SideEffect {
  switch (nesw) {
    case Direction.W:
      return () =>
        setCursor([Math.max(0, cursor[0] - 1), cursor[1], cursor[2]]);
    case Direction.E:
      return () =>
        setCursor([
          Math.min(BOARD_WIDTH - 1, cursor[0] + 1),
          cursor[1],
          cursor[2]
        ]);
    case Direction.N:
      return () =>
        setCursor([cursor[0], Math.max(0, cursor[1] - 1), cursor[2]]);
    case Direction.S:
      return () =>
        setCursor([
          cursor[0],
          Math.min(BOARD_HEIGHT - 1, cursor[1] + 1),
          cursor[2]
        ]);
    default:
      return noop;
  }
}
