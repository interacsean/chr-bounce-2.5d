import * as React from 'react';
import createStyles from './Tile.styles';
import { BoardTile } from '../../types/';
import * as screenUtils from '../../services/screen';

type Props = {
  tile: BoardTile;
  cursor?: boolean,
};

const Tile: React.ComponentType<Props> = ({
  tile,
  cursor,
}: Props): React.ReactElement<'span'> => {
  const { shortestDim } = screenUtils.useScreenSize();

  const styles = createStyles({
    shortest: shortestDim,
    // get from context
    tileRows: 15 // todo: remove hardcoding
  });
  const useChr: string = tile.chr === ' ' ? ' ' : tile.chr;
  return (
    <span
      style={{
        ...styles.tile,
        ...(cursor ? styles.selected : {}),
      }}
    >
      {useChr}
    </span>
  );
};

export default Tile;
