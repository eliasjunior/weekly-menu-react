import React from 'react';
import ReactDOM from 'react-dom';
import RecipeComponent from './RecipeComponent';
import { shallow } from 'enzyme';
import RecipeForm from './RecipeForm';

describe("RecipeComponent", () => {

    it("should load component", () => {
        const div = document.createElement('div');
        ReactDOM.render(<RecipeComponent recipeId='1' />, div);
    });

    it('should component has an recipe id', () => {

		const wrapper = shallow(<RecipeComponent recipeId='1' />);

		const props = wrapper.instance().props;

		expect(props.recipeId).toEqual('1')
    });

});