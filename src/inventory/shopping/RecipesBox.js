import React from 'react';
import { RecipeListComponent } from '../../recipe/RecipeListComponent';
import { CardContent, Card } from '@material-ui/core';

export function RecipeBox(props) {
    const displayRecipes = () => {
        if (props.recipesToInclude && props.recipesToInclude.length) {
            return (
                <Card >
                    <CardContent>
                        <RecipeListComponent
                            title="Recipe included"
                            isNotEditable={true}
                            isRecipeNotSelectable={true}
                            recipes={props.recipesToInclude}
                            onSelectedProd={props.selectedProdRecipe}
                            parentComponent="ShoppingListPage">
                        </RecipeListComponent>
                    </CardContent>
                </Card>
            )
        }
        return ''
    }
    return (
       displayRecipes()
    )
}