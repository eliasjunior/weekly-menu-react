import React from 'react';
import ReactDOM from 'react-dom';
import ProductView from './ProductView';

describe("ProductView", () => {
    it("should load component", () => {
        const div = document.createElement('div');
        ReactDOM.render(<ProductView/>, div);
    });
});
