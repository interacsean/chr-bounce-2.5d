import { BoardTile as BoardTileType } from "../types/BoardTile";

// todo: fill and use
const validTileChrs: Set<string> = new Set();

function newBoardTile(chr: string, editable: boolean = true): BoardTileType {
  return {
    chr,
    editable
  };
}

export { newBoardTile, validTileChrs };
