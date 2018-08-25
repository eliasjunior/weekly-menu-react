import React from 'react';
import CategoryItem from './CategoryItem';
import List from "@material-ui/core/List";

export const CategoryList = (props) => {
    const listItem = (list) => {
        if(!list) {
            console.log('Category list is empty!');
            return;
        }
        return list.map((category, index) => {
            return <CategoryItem 
                        key={index} {...category} 
                        location={props.location}>
                    </CategoryItem>
        });
    }
    return (
        <div>
            <List>
                {listItem(props.list)}
            </List>
        </div>
    );
}



