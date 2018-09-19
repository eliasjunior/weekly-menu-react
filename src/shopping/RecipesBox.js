import React from 'react';
import { RecipeListComponent } from '../recipe/RecipeListComponent';

export function RecipeBox(props) {
    const displayRecipes = () => {
        if (props.recipesToInclude && props.recipesToInclude.length) {
            return (
                <div>
                    <RecipeListComponent
                        title="Recipe included"
                        isNotEditable={true}
                        isRecipeNotSelectable={true}
                        recipes={props.recipesToInclude}
                        onSelectedProd={props.onSelectedProdRecipe}
                        onSelectAllProdOfCatRec={props.onSelectAllProdOfCatRec}
                        onSelectAllProd={props.onSelectAllProdOfCatRec}
                        parentComponent="ShoppingListPage">
                    </RecipeListComponent>
                </div>
            )
        }
        return ''
    }
    return (
        displayRecipes()
    )
}