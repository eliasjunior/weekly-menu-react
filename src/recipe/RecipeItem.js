/**
 * Created by eliasmj on 31/01/2017.
 */
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { ListItemText } from '@material-ui/core';

export const RecipeItem = (props) => {
    return (
        props.type === 'recipe_list' ?
            <ListItem >
                <ListItemText key={props.id} primary={props.name}/>
            </ListItem>
            : 
            <ListItem >
                <ListItemText key={props.id} primary={props.name} secondary={props.weekDay} />
            </ListItem>
    )
}
