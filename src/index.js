import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import WeeklyRouter from './WeeklyRouter';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(<BrowserRouter><WeeklyRouter/></BrowserRouter> , document.getElementById('root'));
registerServiceWorker();