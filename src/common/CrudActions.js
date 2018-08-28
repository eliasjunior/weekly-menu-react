import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { green500, red400 } from 'material-ui/styles/colors';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';

const styles = {
    saveIcon: {
        color: green500
    },
    editIcon: {
        color: green500
    },
    deleteIcon: {
        color: red400
    }
}
export const CrudActions = (props) => {
    const displaySaveOrEditIcon = () => {
        return props.editFieldMode ? 
            <SaveIcon style={styles.saveIcon} 
                onClick={() => props.updateName()} /> :
            <CreateIcon style={styles.editIcon} 
                onClick={() => props.swapIcon()} />;
    }

    const buttons =  (
        <div>
            <IconButton aria-label="Comments">
                {displaySaveOrEditIcon()}
            </IconButton>
            <IconButton aria-label="Comments">
                <DeleteIcon  style={styles.deleteIcon} 
                    onClick={() => props.deleteItem(props.product._id)}>
                </DeleteIcon>    
            </IconButton>
        </div>
    )
    return buttons;
}