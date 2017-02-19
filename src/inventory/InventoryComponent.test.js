import React from 'react';
import ReactDOM from 'react-dom';
import InventoryComponent from './InventoryComponent'

describe("", () => {

    it("should load component", () => {
        const div = document.createElement('div');
        ReactDOM.render(<InventoryComponent/>, div);
    });

});