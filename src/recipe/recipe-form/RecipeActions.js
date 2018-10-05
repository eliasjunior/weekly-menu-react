import Button from '@material-ui/core/Button';
import React from 'react';
import CommmonStyles from '../../styles/CommonStyles';
import { withStyles } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

function RecipeActions(props){
    const { classes } = props;
    const combinedClasses = `${classes.floatingBtn}` 
    const actionButton = () => {
        return props.isToUpdate ?
            <Button color="secondary" variant="fab"
                onClick={() => props.onUpdateAction()} >
                <SaveIcon />
            </Button>
            :
            <Button color="secondary" variant="fab"
                onClick={() => props.onSaveAction()} >
                <SaveIcon />
            </Button>
    }

    return (
        <div className={combinedClasses}>
            {actionButton()}
        </div>
    )
}

export default withStyles(CommmonStyles)(RecipeActions) 