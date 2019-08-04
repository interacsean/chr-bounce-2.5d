import * as React from 'react';
import {
  compose,
  withState,
  withHandlers,
  lifecycle,
  shouldUpdate
} from 'recompose';
import {
  Board as BoardType,
  Piece as PieceType,
  Cursor as CursorType
} from './types';
import PLAY_STATES from './consts/PlayStates';
import { getDefaultBoard } from './models/Board';
import frameTick from './game/frameTick';
import handleKey from './game/handleKey';
import { GameScreen } from './components';
import * as screenUtils from './services/screen';
import styles from './Main.styles';

const FRAME_RATE: number = 1;
const INIT_LEVEL: number = 1;
const INIT_X: number = 1;
const INIT_Y: number = 1;

interface Props {
  board: BoardType;
  setBoard: Function;
  pieces: Array<PieceType>;
  setPieces: Function;
  keydownEventListener: EventListener;
  setKeydownEventListener: Function;
  cursor: CursorType;
  setCursor: Function;
  playState: number;
  setLastResizeTime: Function;
  lastResizeTime: number;
  handleResize: EventListener;
}

type GameInst = {
  props: Props;
};

const getMain: Function = (inst: GameInst): Function => () => {
  if (inst.props.playState === PLAY_STATES.PLAYING) {
    const [newBoard, newPieces]: [BoardType, Array<PieceType>] = frameTick(
      inst.props.board,
      inst.props.pieces
    );
    if (newBoard !== inst.props.board) { inst.props.setBoard(newBoard); }
    if (newPieces !== inst.props.pieces) { inst.props.setPieces(newPieces); }
    setTimeout(getMain(inst), 1000 / FRAME_RATE);
    // How do new balls get generated?
  }
};

const MainView: React.ComponentType<Props> = (
  props: Props
): React.ReactElement<'div'> => {
  const styleVars = {
    shortest: screenUtils.getShortestDim()
  };
  return (
    <div>
      <div style={styles(styleVars).gameScreenCtnr}>
        <GameScreen
          board={props.board}
          pieces={props.pieces}
          cursor={props.cursor}
        />
      </div>
    </div>
  );
};

export default compose(
  withState('board', 'setBoard', getDefaultBoard()),
  withState('pieces', 'setPieces', []),
  withState('keydownEventListener', 'setKeydownEventListener', null),
  withState('cursor', 'setCursor', [INIT_X, INIT_Y, INIT_LEVEL]),
  withState('playState', 'setPlayState', PLAY_STATES.PLAYING),
  withState('lastResizeTime', 'setLastResizeTime', 0),
  withHandlers({
    handleResize: (props: Props) => () => {
      props.setLastResizeTime(Date.now());
    }
  }),
  shouldUpdate((props: Props, nextProps: Props): boolean => {
    return !(
      props.board === nextProps.board &&
      props.cursor === nextProps.cursor &&
      props.pieces === nextProps.pieces &&
      props.lastResizeTime === nextProps.lastResizeTime
    );
  }),
  lifecycle<Props, Object>({
    componentDidMount() {
      // todo: add useScreenSize to recalculate styles
      
      setTimeout(getMain(this), 1000 / FRAME_RATE);
      // set key listener
      const handleKeyListner: EventListener = (e: KeyboardEvent) => {
        if (e !== null) { handleKey(this.props, e); }
      };
      this.props.setKeydownEventListener(handleKeyListner);
      document.addEventListener('keydown', handleKeyListner, false);
    },
    componentWillUnmount() {
      document.removeEventListener('keydown', this.props.keydownEventListener);
    }
  })
)(MainView);
