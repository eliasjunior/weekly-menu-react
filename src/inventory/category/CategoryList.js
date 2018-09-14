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
                key={index + '-' + (new Date().getTime())} category={{ ...category }}
                parentComponent={props.parentComponent}
                onSelectedProd={props.onSelectedProd}>
            </CategoryItem>;
        });
    }
    const isDisplayCatNewBtn = () => {
        return CategoryDisplayService.categoryNewBtn(props.parentComponent).display ?
            <div style={styles.buttons}>
                <Button color="primary" variant="outlined">
                    <Link
                        to={AppConstant.LOCATION.category.path + '/new_category_create'}>
                        New Category
                </Link>
                </Button>
            </div>

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
const styles = {
    buttons : {
        margin: '10px'
    }
}

CategoryList.propTypes = {
    onSelectedProd: PropTypes.func,
    parentComponent: PropTypes.string,
    list: PropTypes.array
}

export default CategoryList



