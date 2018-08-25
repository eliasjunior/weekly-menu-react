import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { green500, red400 } from 'material-ui/styles/colors';
import AddProdBtn from '@material-ui/icons/AddBox';

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
export const CategoryActions = (props) => {
    const manageDisplay = () => {
        return props.isProdAction ? 
                <AddProdBtn 
                    style={styles.editIcon} 
                    onClick={() => props.goProductView()} >
                </AddProdBtn> : ''
    }
    const buttons =  (
        <div>
            <IconButton aria-label="Comments">
                {manageDisplay()}
            </IconButton>
        </div>
    )
    return buttons;
}