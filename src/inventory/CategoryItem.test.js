import React from 'react';
import CategoryItem from './CategoryItem';
import {shallow} from 'enzyme';
import ListItem from '@material-ui/core/List/ListItem';

const fakeIngredients = [{name: 'ingred name 2', _id: '123', attributes: [{name: 'attr', _id: '2'}]}];

const fakeCategory =  {_id: '1', name: 'category 1', ingredients: fakeIngredients};

describe("CategoryItem", () => {

    it("should load component", () => {

        const wrapper = shallow(<CategoryItem {...fakeCategory} />);
        expect(wrapper.find(ListItem).length).toBe(1);

    });

});