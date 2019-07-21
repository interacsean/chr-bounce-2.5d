import * as React from "react";
// import { Props } from "./Level.props";
import styles from "./Level.styles";
import { BoardLevel, BoardTile } from "../../types/";
import { Tile } from "../";

type Props = {
  level: BoardLevel;
};

const renderTile: React.ComponentType<Object> = (
  tile: BoardTile,
  colNum: number
): React.ReactElement<"div"> => {
  return (
    <div style={styles.level__tileCtnr} key={colNum}>
      <Tile tile={tile} />
    </div>
  );
};

const renderRow: React.ComponentType<Object> = (
  row: Array<BoardTile>,
  rowNum: number
): React.ReactElement<"div"> => {
  return (
    <div style={styles.level__rowCtnr} key={rowNum}>
      {row.map(renderTile)}
    </div>
  );
};

const Level: React.ComponentType<Props> = ({
  level
}: Props): React.ReactElement<"div"> => {
  return <div>{level.map(renderRow)} </div>;
};

export default Level;
