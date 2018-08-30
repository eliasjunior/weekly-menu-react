import React from 'react';
import { AppConstant } from '../common/AppConstant';
import { Link } from "react-router-dom";
import { Button } from '@material-ui/core';

export const CategoryActions = (props) => {
    const buttons = (
        <div>
            <Button color="primary">
                <Link to={AppConstant.PATH.PRODUCTS_CREATE+'?id='+props.catId}>New Product</Link>
            </Button>
        </div>
    )
    return buttons;
}