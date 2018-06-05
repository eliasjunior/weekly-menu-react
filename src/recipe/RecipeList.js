/**
 * Created by eliasmj on 31/01/2017.
 */
import React from 'react';
import {RecipeItem} from './RecipeItem'

import List from "material-ui/List";

export const RecipeList = (props) => {
    return  (
        <List>
            {props
                .recipeList
                .map((recipe, id) => <RecipeItem key={id} {...recipe} type={props.type} /> )
            }
        </List>
    )
}

