export default function createStyles(vars: Object): Object {
  return {
    tile: {
      fontFamily: "monospace",
      fontSize: `${vars.shortest / vars.tileRows - 2}px`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      whiteSpace: "pre",
      flex: "1 0 auto",
      width: `${vars.shortest / vars.tileRows - 2}px`,
      height: `${vars.shortest / vars.tileRows - 2}px`,
      marginRight: "2px",
      marginBottom: "2px",
      backgroundColor: "rgba(0,0,0,0.1)"
    }
  };
}
