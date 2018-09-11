import Button from '@material-ui/core/Button';
import React from 'react';
import { AppConstant } from '../../common/AppConstant';
import { Link } from "react-router-dom";

export const ShoppingCreateActions = (props) => {

    const actionButton = () => {
        return props.isUpdate ?
            <Button variant="outlined"
                onClick={() => props.updateShoppingList()} >
                Update List
            </Button>
            :
            <Button variant="outlined"
                onClick={() => props.createShoppingList()} >
                Create List
            </Button>
    }

    return (
        <div>
            <Button variant="outlined">
                <Link
                    to={AppConstant.LOCATION.recipeList.path}>
                    Include Recipe
                </Link>
            </Button>
            {actionButton()}
        </div>
    )
}