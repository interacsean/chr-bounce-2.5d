import {
  Board as BoardType,
  Cursor as CursorType,
  PureMethod,
  SideEffect,
  BoardTile as BoardTileType,
} from '../../types';
import { isEqual, noop } from 'lodash';

interface TrySetTileDeps {
  setBoard: Function;
  cursor: CursorType;
}

/**
 * This updates the board, only updating that actual memory pointer of the tile required.
 */
const updateTileOfBoard: PureMethod<BoardType> = (
  { levels: board, pieces }: BoardType
): Function => (
  lev: number,
  x: number,
  y: number,
  tile: BoardTileType
): BoardType => {
  return {
    levels: isEqual(((board.get(lev) || [])[y] || [])[x], tile)
      ? board
      : new Map(
          board.set(
            lev,
            (board.get(lev) || []).map(
              (row: Array<BoardTileType>, rowKey: number): Array<BoardTileType> => {
                return rowKey !== y
                  ? row
                  : row.map(
                      (oldTile: BoardTileType, colKey: number): BoardTileType =>
                        colKey === x ? tile : oldTile
                    );
              }
            )
          )
        ),
      pieces,
    };
};

export default function trySetTile(board: BoardType): Function {
  return ({ cursor, setBoard }: TrySetTileDeps, chr: string): SideEffect => {
    // todo: safe fallback on this
    const curTile: BoardTileType | undefined = (board.levels.get(cursor[2]) || [])[cursor[1]][cursor[0]];

    if (curTile && curTile.editable && curTile.chr !== chr) {
      // todo: add conditions, not where a piece currently is?
      const newTile: BoardTileType = {
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
