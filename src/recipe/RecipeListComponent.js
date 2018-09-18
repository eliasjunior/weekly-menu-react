import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { RecipeHeaderItem } from './RecipeHeaderItem';
import CategoryList from '../inventory/category/CategoryList';
import PropTypes from 'prop-types';
import IconRecipe from '@material-ui/icons/Receipt'

export const RecipeListComponent = (props) => {
    const buildRecipeList = () => {
        if (props.recipes.length) {
            return props.recipes.map(recipe => {
                return (
                    <div key={recipe._id}>
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
                            onSelectAllProd={ param=> {
                                const withRecipe = {...param, recId: recipe._id}
                                props.onSelectAllProdOfCatRec(withRecipe)
                            }}
                            parentComponent={props.parentComponent}>
                        </CategoryList>
                    </div>)
            });
        } else {
            return ''
        }

    }
    // TODO do like in category, add to a service
    const isTitleDisplay = () => {
        if(props.title && props.recipes.length) {
            return <List>
                        <ListItem>
                            <ListItemIcon>
                                <IconRecipe/>
                            </ListItemIcon>
                            <ListItemText primary={props.title}></ListItemText>
                        </ListItem>
                    </List>
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
