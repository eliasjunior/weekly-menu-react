import React from 'react';
import ReactDOM from 'react-dom';
import App from '../menu/MenuWeekly';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MenuWeekly />, div);
});
