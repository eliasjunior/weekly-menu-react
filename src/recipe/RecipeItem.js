/**
 * Created by eliasmj on 31/01/2017.
 */
import React from 'react';
import ListItem from 'material-ui/List/ListItem';

export const RecipeItem = (props) => {
    return (
        props.type === 'recipe_list' ?
            <ListItem key={props.id}>{props.name}</ListItem>
            :  <ListItem key={props.id} secondaryText={props.weekDay}>{props.name}</ListItem>
    )
}
