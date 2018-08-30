import React from 'react';
import CategoryItem from './CategoryItem';
import List from "@material-ui/core/List";
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import { AppConstant } from '../common/AppConstant';

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
    return (
        <div>
            <Button color="primary" variant="outlined">
                <Link to={AppConstant.PATH.CATEGORY_CREATE}>New Category</Link>
            </Button>
            <List>
                {buildList(props.list)}
            </List>
        </div>
    )    
}   
export default CategoryList



