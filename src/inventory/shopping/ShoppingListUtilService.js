import CloneDeep from 'lodash.clonedeep';

export const ShoppingListUtilService = {
    filterSelectedProductInRecipes(recipes) {
        const filterSelectedProduct = (category) => {
            category.products =
                category.products
                    .filter(product => product.checked)
            return category.products.length > 0;
        };
        const filterCategory = (recipe) => {
            recipe.categories =
                recipe.categories
                    .filter(filterSelectedProduct);
            return recipe.categories.length > 0
        };

        return CloneDeep(recipes)
            .filter(filterCategory);
    },
    updateRecipesSelection(oldRecipeList, updateItem) {
        const product = updateItem.product;
        // review this 3 loops later
        oldRecipeList.forEach(rec => {
            rec.categories.forEach(cat => {
                cat.products.forEach(prod => {
                    if(prod._id === product._id) {
                        product.checked = updateItem.checked
                    }
                })
            })
        })
        return oldRecipeList
    }
}



