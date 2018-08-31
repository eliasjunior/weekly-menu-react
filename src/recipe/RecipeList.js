/**
 * Created by eliasmj on 31/01/2017.
 */
import React from 'react';
import {RecipeItem} from './RecipeItem'
import List from "@material-ui/core/List";

// DELETE if not using,
export const RecipeList = (props) => {
    return  (
        <List>
            {props
                .recipes
                .map((recipe, index) => <RecipeItem key={index} {...recipe} type={props.type} /> )
            }
        </List>
    )
}

