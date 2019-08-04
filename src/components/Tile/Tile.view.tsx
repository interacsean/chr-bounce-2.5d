import * as React from "react";
// import { Props } from "./Level.props";
import createStyles from "./Tile.styles";
import { BoardTile } from "../../types/";
import * as screenUtils from "../../services/screen";

type Props = {
  tile: BoardTile;
};

const Tile: React.ComponentType<Props> = ({
  tile
}: Props): React.ReactElement<"span"> => {
  const styles: Object = createStyles({
    shortest: screenUtils.getShortestDim(),
    // get from context
    tileRows: 15 //todo: remove hardcoding
  });
  const useChr: string = tile.chr === " " ? " " : tile.chr;
  return <span style={styles.tile}>{useChr}</span>;
};

export default Tile;
