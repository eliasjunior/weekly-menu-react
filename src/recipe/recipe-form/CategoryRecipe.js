import React from 'react'
import { CategoryList } from '../../inventory/category/CategoryList';

export function CategoryRecipe(props) {
    return <CategoryList
        list={props.list}
        parentComponent="RecipePage"
        onSelectedProd={props.onSelectedProd}
        onSelectAllProd={props.onSelectAllProd}>
    </CategoryList>
}

