import * as React from "react";
import { Props } from "./GameScreen.props";
import createStyles from "./GameScreen.styles";
import { BoardLevel } from "../../types/";
import { Level } from "../";
import { partialRight } from "lodash";

type LevelEntry = [number, BoardLevel];

const renderLevel: React.ComponentType<Object> = (
  levelEntry: LevelEntry,
  isActive: boolean,
  styles: Object
): React.ReactElement<"div"> => {
  return (
    <div
      style={Object.assign(
        {},
        styles[`gameScreen__level${levelEntry[0]}`],
        styles[`gameScreen__level${isActive ? "Active" : "Inactive"}`]
      )}
      key={levelEntry[0]}
    >
      <Level level={levelEntry[1]} />
    </div>
  );
};

const GameScreen: React.ComponentType<Props> = (
  props: Props
): React.ReactElement<"div"> => {
  const styles: Object = createStyles();
  // const boardLevels: Array<LevelEntry> = Array.from(props.board.entries());
  return (
    <div style={styles.gameScreen__ctnr}>
      <Level level={props.board.get(props.cursor[2])} />
    </div>
  );
};

export default GameScreen;
