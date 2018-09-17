import React from 'react';
import CategoryList from '../category/CategoryList';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import IconProduct from '@material-ui/icons/ShoppingBasket'

export function ProductBox(props) {
    return (
        <div>
            <List>
                <ListItem>
                    <ListItemIcon>
                        < IconProduct/>
                    </ListItemIcon>
                    <ListItemText primary="Products"></ListItemText>
                </ListItem>
            </List>
            <CategoryList
                list={props.list}
                parentComponent="ShoppingListPage"
                onSelectedProd={props.onSelectedProd}>
            </CategoryList>
        </div>
    )
}