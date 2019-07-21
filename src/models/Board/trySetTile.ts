import {
  Board as BoardType,
  Cursor as CursorType,
  BoardTile as TileType,
  PureMethod,
  SideEffect
} from "../../types";
import { isEqual, noop } from "lodash";

interface TrySetTileDeps {
  setBoard: Function;
  cursor: CursorType;
}

export default function trySetTile(board: BoardType): Function {
  return ({ cursor, setBoard }: TrySetTileDeps, chr: string): SideEffect => {
    // todo: safe fallback on this
    const curTile: TileType = board.get(cursor[2])[cursor[1]][cursor[0]];
    if (curTile.editable && curTile.chr !== chr) {
      // todo: add conditions, not where a piece currently is?
      const newTile: TileType = {
        chr,
        editable: true
      };
      const newBoard: BoardType = updateTileOfBoard(board)(
        cursor[2],
        cursor[0],
        cursor[1],
        newTile
      );
      return newBoard === board
        ? noop
        : function() {
            setBoard(newBoard);
          };
    }
    return noop;
  };
}

/**
 * This updates the board, only updating that actual memory pointer of the tile required.
 */
const updateTileOfBoard: PureMethod<BoardType> = (
  board: BoardType
): Function => (
  lev: number,
  x: number,
  y: number,
  tile: TileType
): BoardType => {
  return isEqual(((board.get(lev) || [])[y] || [])[x], tile)
    ? board
    : new Map(
        board.set(
          lev,
          (board.get(lev) || []).map(
            (row: Array<TileType>, rowKey: number): Array<TileType> => {
              return rowKey !== y
                ? row
                : row.map(
                    (oldTile: TileType, colKey: number): TileType =>
                      colKey === x ? tile : oldTile
                  );
            }
          )
        )
      );
};
