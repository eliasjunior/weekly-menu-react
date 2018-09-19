import React from 'react';
import CategoryList from '../inventory/category/CategoryList';
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
                onSelectedProd={props.onSelectedProd}
                onSelectAllProd={props.onSelectAllProd}>
            </CategoryList>
        </div>
    )
}