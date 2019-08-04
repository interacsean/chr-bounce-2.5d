import { CSSProperties } from 'react';

type Vars = {
  shortest: number,
  tileRows: number,
};

export default function createStyles(vars: Vars) {
  return {
    tile: <CSSProperties> {
      fontFamily: 'monospace',
      fontSize: `${vars.shortest / vars.tileRows - 2}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      whiteSpace: 'pre',
      flex: '1 0 auto',
      width: `${vars.shortest / vars.tileRows - 2}px`,
      height: `${vars.shortest / vars.tileRows - 2}px`,
      margin: '1px',
      backgroundColor: 'rgba(0,0,0,0.1)'
    },
    selected: <CSSProperties> {
      border: '1px solid red',
      margin: 0,
    }
  };
}
