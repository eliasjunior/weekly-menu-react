import Button from '@material-ui/core/Button';
import React from 'react';
import { AppConstant } from '../../common/AppConstant';
import { Link } from "react-router-dom";
import CommmonStyles from '../../styles/CommonStyles';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

function ShoppingCreateActions(props){
    const { classes } = props;
    console.log(classes)
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
        <div className={classes.floatingPadding +' '+classes.floatingBtn}>
            <Button color="primary"
                variant="fab">
                <Link
                    to={AppConstant.LOCATION.recipeList.path}>
                    <AddIcon />
                </Link>
            </Button>
            {actionButton()}
        </div>
    )
}

export default withStyles(CommmonStyles)(ShoppingCreateActions) 