import React from 'react';
import { shallow } from 'enzyme';
import RecipeForm from './RecipeForm';

describe("RecipeForm", () => {

    it("Should render the component", () => {
        shallow(<RecipeForm />);
    });
    //  it('should TextField defaultvalue be defined', () => {
    //  	const recipe = {
    //  		recipeId: '1',
    //  		name: 'test',
    //  		meal: ''
    //  	}
	// 	const wrapper = shallow(<RecipeForm {...recipe}/>);
	// 	const recipeProps = wrapper.instance().props;
	// 	expect(recipeProps.recipeId).toEqual(recipe.recipeId)
	// 	expect(wrapper.find(TextField).first().props().defaultValue).toEqual(recipe.name)
    // });
});