import React from 'react';
import RecipeForm from './RecipeForm';
import { shallow } from 'enzyme';
import TextField from "material-ui/TextField";
import RadioButton from 'material-ui/RadioButton';
import RecipeComponent from './RecipeComponent';

describe("RecipeForm", () => {

    it("should contain a list of input", () => {

        const wrapper = shallow(<RecipeForm/>);

        expect(wrapper.find(TextField).length > 0).toBe(true);

        expect(wrapper.find(RadioButton).length > 0).toBe(true);

    });

     it('should TextField defaultvalue be defined', () => {

     	const recipe = {
     		recipeId: '1',
     		name: 'test',
     		meal: ''
     	}

		const wrapper = shallow(<RecipeForm {...recipe}/>);

		const recipeProps = wrapper.instance().props;

		expect(recipeProps.recipeId).toEqual(recipe.recipeId)
	
		expect(wrapper.find(TextField).first().props().defaultValue).toEqual(recipe.name)

    });

});