import React from 'react';
import ReactDOM from 'react-dom';
import InventoryPage from './InventoryPage'

describe("", () => {

    it("should load component", () => {
        const div = document.createElement('div');
        ReactDOM.render(<InventoryPage/>, div);
    });

});