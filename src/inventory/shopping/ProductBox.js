import React from 'react';
import { CardContent, Card } from '@material-ui/core';
import { CategoryList } from '../category/CategoryList';

export function ProductBox(props) {
    return (
        <Card >
        <CardContent>
            <h4>Products</h4>
            <CategoryList
                list={props.list}
                parentComponent="ShoppingListPage"
                onSelectedProd={props.onSelectedProd}>
            </CategoryList>
        </CardContent>
    </Card>
    )
}