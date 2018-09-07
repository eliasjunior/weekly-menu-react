import React from 'react';
import CategoryItem from './CategoryItem';
import List from "@material-ui/core/List";
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import { AppConstant } from '../../common/AppConstant';
import CategoryDisplayService from './CategoryDisplayService';
import PropTypes from 'prop-types';

export const CategoryList = (props) => {
    const buildList = (list) => {
        if (!list) {
            console.error('Category list is null');
            return;
        }
        return list.map((category, index) => {
            return <CategoryItem
                key={index} category={{...category}}
                parentComponent={props.parentComponent}
                onSelectedProd={props.onSelectedProd}>
            </CategoryItem>;
        });
    }
    const isDisplayCatNewBtn = () => {
        return CategoryDisplayService.categoryNewBtn(props.parentComponent).display ?
            <Button color="primary" variant="outlined">
                <Link 
                    to={AppConstant.PATH.CATEGORY + '/new_category_create'}>
                    New Category
                </Link>
            </Button>
            : ''
    }
    return (
        <div>
            {isDisplayCatNewBtn()}
            <List>
                {buildList(props.list)}
            </List>
        </div>
    )
}

CategoryList.propTypes = {
    onSelectedProd: PropTypes.func,
    parentComponent: PropTypes.string,
    list: PropTypes.array
}

export default CategoryList



