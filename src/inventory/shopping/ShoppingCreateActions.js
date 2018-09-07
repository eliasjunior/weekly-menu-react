import Button from '@material-ui/core/Button';
import React from 'react';
import { AppConstant } from '../../common/AppConstant';
import { Link } from "react-router-dom";

export const ShoppingCreateActions = (props) => {
    return (
        <div>
            <Button variant="outlined">
                <Link 
                    to={AppConstant.PATH.RECIPE_LIST}>
                    Include Recipe
                </Link>
            </Button> 
            <Button variant="outlined" 
                onClick={() => props.createShoppingList()} >
                Create List
            </Button>
        </div>
    )
}