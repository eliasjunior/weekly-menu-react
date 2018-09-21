import React from 'react';
import CategoryItem from './CategoryItem';
import List from "@material-ui/core/List";
import PropTypes from 'prop-types';

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
                onSelectAllProd={props.onSelectAllProd}
                onRefresh={props.onRefresh}>
            </CategoryItem>;
        });
    }
    return (
        <div>
            <List>
                {buildList(props.list)}
            </List>
        </div>
    )
}

CategoryList.propTypes = {
    onSelectedProd: PropTypes.func,
    onSelectAllProd: PropTypes.func,
    parentComponent: PropTypes.string,
    list: PropTypes.array
}
export default CategoryList



