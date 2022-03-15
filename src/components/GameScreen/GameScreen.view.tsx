import * as React from 'react';
import { Props } from './GameScreen.props';
import createStyles from './GameScreen.styles';
import { Level } from '../';

const GameScreen: React.ComponentType<Props> = (
  props: Props
): React.ReactElement<'div'> => {
  const styles = createStyles();
  return (
    <div style={styles.gameScreen__ctnr}>
      <Level
        level={props.board.levels.get(props.cursor[2])}
        cursor={props.cursor}
      />
    </div>
  );
};

export default GameScreen;
