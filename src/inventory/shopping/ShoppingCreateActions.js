import Button from '@material-ui/core/Button';
import React from 'react';
import { AppConstant } from '../../common/AppConstant';
import { Link } from "react-router-dom";

export const ShoppingCreateActions = (props) => {
    const actionButton = () => {
        return props.isUpdate ?
            <Button color="secondary" variant="outlined"
                onClick={() => props.updateShoppingList()} >
                Update List
            </Button>
            :
            <Button color="secondary" variant="outlined"
                onClick={() => props.createShoppingList()} >
                Create List
            </Button>
    }

    return (
        <div style={styles.buttons}>
            <Button color="primary" 
                variant="outlined" 
                style={styles.firstButton}>
                <Link
                    to={AppConstant.LOCATION.recipeList.path}>
                    Include Recipe
                </Link>
            </Button>
            {actionButton()}
        </div>
    )
}

const styles = {
    buttons: {
        margin: '10px'
    },
    firstButton: {
        marginRight: '5px'
    }
}