import React from 'react';
import CategoryItem from './CategoryItem';
import List from "@material-ui/core/List";
import { Button, withStyles } from '@material-ui/core';
import { Link } from "react-router-dom";
import { AppConstant } from '../../common/AppConstant';
import CategoryDisplayService from './CategoryDisplayService';
import PropTypes from 'prop-types';
import CommmonStyles from '../../styles/CommonStyles';
import AddIcon from '@material-ui/icons/Add';

function CategoryList(props) {
    const buildList = (list) => {
        if (!list) {
            console.error('Category list is null');
            return;
        }
        return list.map(category => {
            return <CategoryItem
                key={category._id} category={{ ...category }}
                parentComponent={props.parentComponent}
                onHandleMessage={props.onHandleMessage}
                onSelectedProd={props.onSelectedProd}
                onSelectAllProd={props.onSelectAllProd}>
            </CategoryItem>;
        });
    }
    const isDisplayCatNewBtn = () => {
        const { classes } = props
        return CategoryDisplayService.categoryNewBtn(props.parentComponent).display ?
            <div>
                <Button color="primary" variant="fab" className={classes.floatingBtn}>
                    <Link
                        to={AppConstant.LOCATION.category.path + '/new_category_create'}>
                        <AddIcon />
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
    buttons: {
        margin: '10px'
    }
}

CategoryList.propTypes = {
    onSelectedProd: PropTypes.func,
    parentComponent: PropTypes.string,
    list: PropTypes.array
}

export default withStyles(CommmonStyles)(CategoryList)



