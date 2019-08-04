import * as React from 'react';
import { render } from 'react-dom';
import Main from './Main';

const styles = {
  fontFamily: 'sans-serif',
  height: '100%'
};

const App = () => (
  <div style={styles}>
    <Main />
  </div>
);

render(<App />, document.getElementById('root'));
