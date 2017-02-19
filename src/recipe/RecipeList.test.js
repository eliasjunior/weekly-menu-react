/**
 * Created by eliasmj on 16/02/2017.
 */

import React from 'react';
import {RecipeList} from './RecipeList';
import {shallow} from 'enzyme';
import {RecipeItem} from './RecipeItem';

describe("Recipe List", ()=> {

    it("should load the list", ()=> {

        const fakeList = [{name: 'test', isInMenuWeek: true}, {name: 'test 2', isInMenuWeek: false}];

        const list =  shallow(<RecipeList recipeList={fakeList} type="recipe_list"/>);

        expect(list.find(RecipeItem).length).toBe(2);

    });

});