import { CSSProperties } from 'react';

type Vars = {
  shortest: number,
};

export default function(vars: Vars) {
  return {
    gameScreenCtnr: <CSSProperties> {
      position: 'relative',
      width: `${vars.shortest}px`,
      height: `${vars.shortest}px`
    }
  };
}
