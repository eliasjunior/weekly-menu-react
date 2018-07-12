import React from 'react';
import ReactDOM from 'react-dom';
import ProductViewLabel from './ProductViewLabel';

describe('Product View Label', () => {
    it('should render product view label component', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ProductViewLabel/>, div)
    });
});