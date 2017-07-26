import React from 'react';
import ReactDOM from 'react-dom';
import ProductFormComponent from './ProductFormComponent';
import { shallow } from 'enzyme';
import TextField from "material-ui/TextField";

describe("ProductFormComponent", () => {

    it("should contain a list of input", () => {

        const wrapper = shallow(<ProductFormComponent/>);

        expect(wrapper.find(TextField).length > 0).toBe(true);
    });
});
