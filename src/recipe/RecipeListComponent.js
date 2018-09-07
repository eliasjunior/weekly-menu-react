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
                                onSelectRecipe={props.onSelectRecipe}>
                            </RecipeHeaderItem>
                        </List>
                        <CategoryList
                            list={recipe.categories}
                            onSelectedProd={props.onSelectedProd}
                            parentComponent={props.parentComponent}>
                        </CategoryList>
                        <Divider></Divider>
                    </div>)
            });
        } else {
            return ''
        }

    }
    // TODO do like in category, add to a service
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
    onSelectRecipe: PropTypes.func,
    onSelectedProd: PropTypes.func
}
