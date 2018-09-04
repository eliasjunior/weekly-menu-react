import React from 'react';
import ProductForm from './ProductForm';
import { shallow } from 'enzyme';

describe("ProductForm", () => {
    it("should contain a list of input", () => {
        const wrapper = shallow(<ProductForm/>);
       // expect(wrapper.find(TextField).length > 0).toBe(true);
    });
});
