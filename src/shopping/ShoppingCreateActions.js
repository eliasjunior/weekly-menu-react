import Button from '@material-ui/core/Button';
import React from 'react';
import { AppConstant } from '../common/AppConstant';
import { Link } from "react-router-dom";
import CommmonStyles from '../styles/CommonStyles';
import { withStyles } from '@material-ui/core';
import IncludeIcon from '@material-ui/icons/Receipt';
import SaveIcon from '@material-ui/icons/Save';

function ShoppingCreateActions(props){
    const { classes } = props;
    const combinedClasses = `${classes.floatingPadding} ${classes.floatingBtn} gridFloatingBtn` 
    const actionButton = () => {
        return props.isUpdate ?
            <Button color="secondary" variant="fab"
                onClick={() => props.updateShoppingList()} >
                <SaveIcon />
            </Button>
            :
            <Button color="secondary" variant="fab"
                onClick={() => props.createShoppingList()} >
                <SaveIcon />
            </Button>
    }

    return (
        <div className={combinedClasses}>
            <Button color="primary"
                variant="fab">
                <Link
                    to={AppConstant.LOCATION.recipeList.path}>
                    <IncludeIcon />
                </Link>
            </Button>
            {actionButton()}
        </div>
    )
}

export default withStyles(CommmonStyles)(ShoppingCreateActions) 