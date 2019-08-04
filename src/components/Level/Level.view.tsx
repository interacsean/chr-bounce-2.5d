import * as React from 'react';
// import { Props } from "./Level.props";
import styles from './Level.styles';
import { BoardLevel, BoardTile, Cursor } from '../../types/';
import { Tile } from '../';

type Props = {
  level: BoardLevel;
  cursor: Cursor;
};

// temp:
// @ts-ignore
const LTile: React.FC<Object> = React.memo(
  ({
    tile,
    colNum,
    cursor
  }: {
    tile: BoardTile;
    colNum: number;
    cursor?: boolean;
  }): React.ReactElement<'div'> => {
    return (
      <div style={styles.level__tileCtnr} key={colNum}>
        <Tile tile={tile} cursor={cursor} />
      </div>
    );
  }
);

// temp:
// @ts-ignore
const Row: React.FC<Object> = React.memo(
  ({
    row,
    rowNum,
    cursor
  }: {
    row: Array<BoardTile>;
    rowNum: number;
    cursor?: Cursor;
  }): React.ReactElement<'div'> => {
    return (
      <div style={styles.level__rowCtnr} key={rowNum}>
        {row.map((tile, colNum) => (
          <LTile
            key={colNum}
            {...{
              tile,
              colNum,
              cursor: cursor && cursor[0] === colNum ? true : false
            }}
          />
        ))}
      </div>
    );
  }
);

// temp:
// @ts-ignore
const Level: React.FC<Props> = React.memo(
  ({ level, cursor }: Props): React.ReactElement<'div'> => {
    return (
      <div>
        {level.map((row, rowNum) => (
          <Row
            key={rowNum}
            {...{
              row,
              rowNum,
              cursor: cursor && cursor[1] === rowNum ? cursor : undefined
            }}
          />
        ))}
      </div>
    );
  }
);

export default Level;
