// import * as React from 'react';

function getWidth(): number {
  return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

function getHeight(): number {
  return Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
}

function getLongestDim(): number {
  return Math.max(getWidth(), getHeight());
}

function getShortestDim(): number {
  return Math.min(getWidth(), getHeight());
}

function isPortrait(): boolean {
  return getHeight() > getWidth();
}

// todo I'm not going to write this
function useScreenSize() {
  // const [dims, setDims] = React.useState([getWidth(), getHeight()]);

  return {
    shortestDim: getShortestDim(),
  };
}

export { getWidth, getHeight, getLongestDim, getShortestDim, isPortrait, useScreenSize };
