import React from 'react';
import ListItem from 'material-ui/List/ListItem';

export const CategoryItem = (props) => {
    return  <ListItem key={props.id}>{props.name}</ListItem>
}