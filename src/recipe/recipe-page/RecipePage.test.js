import React from 'react';
import RecipeComponent from './RecipePage';
import { shallow } from 'enzyme';

describe("RecipePage", () => {
    it("should load component", () => {
        shallow(<RecipeComponent location={{pathname: ''}} recipeId='1' />);
    });
});