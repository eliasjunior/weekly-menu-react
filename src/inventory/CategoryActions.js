import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { green, red } from '@material-ui/core/colors';
import AddProdBtn from '@material-ui/icons/AddBox';
import { AppConstant } from '../common/AppConstant';
import { Link } from "react-router-dom";

const styles = {
    saveIcon: {
        color: green[500]
    },
    editIcon: {
        color: green[500]
    },
    deleteIcon: {
        color: red[400]
    }
}
export const CategoryActions = (props) => {
    const buttons = (
        <div>
            {/* <IconButton aria-label="Comments">
                <AddProdBtn style={styles.editIcon}>
                    
                </AddProdBtn>
            </IconButton> */}
            <Link to={AppConstant.PATH.PRODUCTS_CREATE+'?id='+props.catId}>New Product</Link>
            
        </div>
    )
    return buttons;
}