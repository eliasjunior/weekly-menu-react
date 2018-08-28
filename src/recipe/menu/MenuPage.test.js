/**
 * Created by eliasmj on 15/02/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import MenuComponent from './MenuComponent'

describe("Menu Component", ()=> {

    it("should load menu component", ()=> {
        const div = document.createElement('div');
        ReactDOM.render(<MenuComponent />, div);
    });

});