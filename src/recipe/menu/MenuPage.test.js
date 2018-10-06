/**
 * Created by eliasmj on 15/02/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import MenuPage from './MenuPage'

describe("Menu Component", ()=> {
    it("should load menu page", ()=> {
        const div = document.createElement('div');
        ReactDOM.render(<MenuPage />, div);
    });
});