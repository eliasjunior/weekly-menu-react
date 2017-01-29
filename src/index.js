import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import WeeklyRouter from './WeeklyRouter';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
  <WeeklyRouter />,
  document.getElementById('root')
);
