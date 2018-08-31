import React from 'react';
import CategoryItem from './CategoryItem';
import List from "@material-ui/core/List";
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import { AppConstant } from '../../common/AppConstant';
import CategoryDisplayService from './CategoryDisplayService';

export const CategoryList = (props) => {
    const buildList = (list) => {
        if (!list) {
            console.error('Category list is null');
            return;
        }
        return list.map((category, index) => {
            return <CategoryItem
                key={index} {...category}
                location={props.location}
                onSelectedProd={props.onSelectedProd}>
            </CategoryItem>;
        });
    }
    const isDisplayCatNewBtn = () => {
        return CategoryDisplayService.categoryNewBtn(props.location).display ?
            <Button color="primary" variant="outlined">
                <Link to={AppConstant.PATH.CATEGORY + '/new_category_create'}>New Category</Link>
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
export default CategoryList



