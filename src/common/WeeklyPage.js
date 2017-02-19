import React from 'react';
import {RecipeList} from "../recipe/RecipeList";
import {CategoryList} from "../inventory/CategoryList";

//later
export const WeeklyPage = (props)=> {

    const components = {
        recipeList: RecipeList,
        categoryList: CategoryList
    }

    const SpecificComponent = components[props.componentType];

    <div>
        <AppWeekBar title={props.title}></AppWeekBar>
        <SpecificComponent />
    </div>
}
