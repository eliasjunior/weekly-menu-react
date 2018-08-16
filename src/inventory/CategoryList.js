import React from 'react';
import CategoryItem from './CategoryItem';
import List from "@material-ui/core/List";

export const CategoryList = (props) => {
    return (
        <div>
            <List>
                {props.list.map((category, index) => {
                    return <CategoryItem key={index} {...category}></CategoryItem>
                })}
            </List>
        </div>
       
    );
}



