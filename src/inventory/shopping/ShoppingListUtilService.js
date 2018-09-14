import CloneDeep from 'lodash.clonedeep';
import Util from '../../service/UtilCollectionService';

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
                    if (prod._id === product._id) {
                        product.checked = updateItem.checked
                    }
                })
            })
        })
        return oldRecipeList
    },
    mergeCategories(recipes, categories) {
        const allCategoriesRecipe = Util
            .getAllSortCategoriesRecipe(recipes);

        const mergeProductOfCategory = category => {
            const categoryInrecipe = Util
                .findItemBinarySearch(category.name, allCategoriesRecipe);

            if (categoryInrecipe) {
                category.products = category.products.concat(categoryInrecipe.products)
            }
            return category;
        }    

        let categoriesMerge =
            CloneDeep(categories)
                .map(mergeProductOfCategory)
                .sort((catA, catB) => catA.name > catB.name ? 1 : -1);

        return addMissingCategories(allCategoriesRecipe, categoriesMerge);
    },
    mapRecAndCatToProducts(recipes) {
        const mapProducts = (recipe, category) => {
            const newProds = category.products.map(product => {
                return {
                    ...product,
                    recName: recipe.name,
                    recId: recipe._id
                };
            })
            category.products = newProds;
            return category;
        }
        return recipes.map(recipe => {
            const newCategories = 
                recipe.categories
                    .map(mapProducts.bind(null, recipe));
            recipe.categories = newCategories;
            return recipe;
        });
    }
}

function addMissingCategories(allCatsRecipe, categoriesMerge) {
    const catsMissing = allCatsRecipe.filter(cat => {
        const foundInCat = Util.findItemBinarySearch(cat.name, categoriesMerge)
        return foundInCat === false;
    })
    if (catsMissing.length) {
        categoriesMerge = categoriesMerge.concat(catsMissing);
        return categoriesMerge;
    } else {
        return categoriesMerge;
    }
}


