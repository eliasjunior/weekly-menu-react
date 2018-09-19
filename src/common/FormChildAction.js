import React from 'react';
import Edit from '@material-ui/icons/Create';
import Close from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';

// TODO review this component, maybe dont need it or refactor
function FormChildAction(props) {
    const styles = {
        buttonSave: {
            marginRight: '10px'
        }
    }
    const isUpdateOrSave = (isToUpdate) => {
        if (isToUpdate) {
            return (
                <IconButton 
                    variant="contained"
                    color="primary"
                    onClick={() => props.onActionMethod()}>
                    <Edit />
                </IconButton>
            )
        } else {
            return (
                <IconButton
                    variant="contained"
                    color="primary"
                    onClick={() => props.onActionMethod()}>
                    <SaveIcon />
                </IconButton>
            )
        }
    }

    const closeBtn = () => {
        return (
            <IconButton  
                variant="contained" 
                color="secondary"
                onClick={() => props.onCloseDialog()}>
                <Close />
            </IconButton>
        )
    }
    return (
        <div>
            {isUpdateOrSave(props.isToUpdate)}
            {closeBtn()}
        </div>
    )
}

export default FormChildAction;