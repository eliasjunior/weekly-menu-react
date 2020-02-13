import React from 'react';
import CategoryItem from './CategoryItem';
import {shallow} from 'enzyme';

const fakeProducts = [{name: 'ingred name 2', _id: '123'}];
const fakeCategory =  {_id: '1', name: 'category 1', products: fakeProducts};

describe("CategoryItem", () => {
    it("should load component", () => {
        const wrapper = shallow(<CategoryItem category={{...fakeCategory}} />);
       // expect(wrapper.find(ListItem).length).toBe(1);
    });

});