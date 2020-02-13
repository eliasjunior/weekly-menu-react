import React from 'react';
import {CategoryList} from './CategoryList';
import CategoryItem from './CategoryItem'
import {shallow} from 'enzyme';


describe("CategoryList", () => {
    it("should contain at least one category in the list", () => {

        const fakeList = [{name: 'test'}, {name: 'test 2'}];

       // const wrapper = shallow(<CategoryList list={fakeList}/>);

        //
        // //need to get as a component !!! in the RecipeList RecipeItem is a const
       //  expect(wrapper.find(CategoryItem).length).toBe(2);

    });

});