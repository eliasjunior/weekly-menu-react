import React from 'react';
import { List, Divider } from '@material-ui/core';
import { RecipeHeaderItem } from './RecipeHeaderItem';
import { CategoryList } from '../inventory/category/CategoryList';
import PropTypes from 'prop-types';


export const RecipeListComponent = (props) => {
    const buildRecipeList = () => {
        if (props.recipes.length) {
            return props.recipes.map((recipe, index) => {
                return (
                    <div key={index}>
                        <List>
                            <RecipeHeaderItem 
                                recipe={recipe}
                                isNotEditable={props.isNotEditable}
                                isRecipeNotSelectable={props.isRecipeNotSelectable}
                                onSelectAction={props.onSelectAction}>
                            </RecipeHeaderItem>
                        </List>
                        <CategoryList
                            list={recipe.categories}
                            parentComponent="RecipeListPage">
                        </CategoryList>
                        <Divider></Divider>
                    </div>)
            });
        } else {
            return ''
        }
    }
    const isTitleDisplay = () => {
        if(props.title && props.recipes.length) {
            return  <h4>{props.title}</h4> 
        } else return '';
    }
    return (
        <div>
            {isTitleDisplay()}
            <List>
                {buildRecipeList()}
            </List>
        </div>
    );
}

RecipeListComponent.propTypes = {
    title: PropTypes.string,
    recipes: PropTypes.array,
    onSelectAction: PropTypes.func
}
