import React from 'react';
import CategoryItem from './CategoryItem';
import List from "@material-ui/core/List";
import CategoryDisplayService from './CategoryDisplayService';
import {ShoppingCreateActions} from './ShoppingCreateActions';

const styles = {
    recipeBox: {
        marginLeft: '10px',
        marginTop: '10px'
    }
}

export const CategoryList = (props) => {
    const listItem = (list) => {
        if (!list) {
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
    const displayBtnRecipe = () => {
        return CategoryDisplayService.recipeSelectionBtn(props.location).display ?
            <ShoppingCreateActions></ShoppingCreateActions>
            : '';
    }
    return (
        <div>
            <div style={styles.recipeBox}>
                {displayBtnRecipe()}
            </div>
            <List>
                
                {listItem(props.list)}
            </List>
        </div>
    );
}



