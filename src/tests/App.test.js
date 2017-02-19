import React from 'react';
import ReactDOM from 'react-dom';
import WeeklyRouter from '../WeeklyRouter';

describe("Main App Test", ()=> {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WeeklyRouter />, div);
  });
});

