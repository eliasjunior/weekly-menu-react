import React from 'react';
import CategoryItem from './CategoryItem';
import List from "@material-ui/core/List";

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
            <List>
                {buildList(props.list)}
            </List>
        </div>
    )    
}   
export default CategoryList



