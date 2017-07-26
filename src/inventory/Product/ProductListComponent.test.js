import React from 'react';
import ReactDOM from 'react-dom';
import ProductListComponent from './ProductListComponent';

describe("ProductListComponent", () => {

    it("should load component", () => {

        const div = document.createElement('div');
        ReactDOM.render(<ProductListComponent/>, div);

    });

});
