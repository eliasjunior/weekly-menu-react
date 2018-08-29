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
    const buttons = (
        <div>
            <IconButton aria-label="Comments">
                <AddProdBtn
                    style={styles.editIcon}
                    onClick={() => props.goProductView(props.catId)} >
                </AddProdBtn>
            </IconButton>
        </div>
    )
    return buttons;
}