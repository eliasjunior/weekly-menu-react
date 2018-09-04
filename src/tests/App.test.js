import React from 'react';
import ReactDOM from 'react-dom';
import WeeklyRouter from '../WeeklyRouter';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

// configure({ adapter: new Adapter() });

describe("Main App Test", ()=> {
  it('renders without crashing', () => {
    shallow(<WeeklyRouter />);
  });
});

