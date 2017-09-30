import React from 'react';
import ReactDOM from 'react-dom';
import ProductListView from './ProductListView';

describe("ProductListView", () => {

    it("should load component", () => {

        const div = document.createElement('div');
        ReactDOM.render(<ProductListView/>, div);

    });

});
