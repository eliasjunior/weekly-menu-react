import React from 'react';
import CategoryList from '../inventory/category/category-list/components';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import IconProduct from '@material-ui/icons/ShoppingBasket'
import { green } from '@material-ui/core/colors'

export function ProductBox(props) {
    return (
        <div>
            <List>
                <ListItem style={{ backgroundColor: green[400] }}>
                    <ListItemIcon>
                        < IconProduct />
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