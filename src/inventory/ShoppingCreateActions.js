import Button from '@material-ui/core/Button';
import React from 'react';
// 14: 40
export const ShoppingCreateActions = (props) => {
    return (
        <div>
            <Button variant="contained" 
                onClick={() => console.log('go recipe selection page')} >
                Include Recipe
            </Button> 
            <Button variant="contained" 
                onClick={() => props.createShoppingList()} >
                Create List
            </Button>
        </div>
    )
}