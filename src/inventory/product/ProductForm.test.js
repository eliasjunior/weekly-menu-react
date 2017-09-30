import React from 'react';
import ReactDOM from 'react-dom';
import ProductForm from './ProductForm';
import { shallow } from 'enzyme';
import TextField from "material-ui/TextField";

describe("ProductForm", () => {

    it("should contain a list of input", () => {

        const wrapper = shallow(<ProductForm/>);

        expect(wrapper.find(TextField).length > 0).toBe(true);
    });
});
