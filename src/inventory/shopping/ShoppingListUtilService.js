import CloneDeep from 'lodash.clonedeep';
import UtilCollectionService from '../../service/UtilCollectionService';

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
        const allCategoriesRecipe = UtilCollectionService
            .getAllCategoriesRecipe(recipes);

        const allProductsRecipe = UtilCollectionService
            .getAllProducts(allCategoriesRecipe);

        const categoriesMerge = CloneDeep(categories);

        categoriesMerge.forEach(category => {
            const newProducts = category.products
                .reduce(reducerAddProdRecipeToCategory.bind(null, allProductsRecipe), []);
            category.products = newProducts;
        });

        return addMissingCategories(allCategoriesRecipe, categoriesMerge);
    }
}

function reducerAddProdRecipeToCategory(allProds, acc, product) {
    const prodInRecipe = UtilCollectionService
        .findItemBinarySearch(product.name, allProds);
    if (prodInRecipe) {
        acc.push(prodInRecipe);
    }
    acc.push(product);
    return acc;
}

function addMissingCategories(allCatsRecipe, categoriesMerge) {
    const catsMissing = allCatsRecipe.filter(cat => {
        return !UtilCollectionService.findItemBinarySearch(cat.name, categoriesMerge);
    })
    if(catsMissing.length) {
        categoriesMerge = categoriesMerge.concat(catsMissing);
        return categoriesMerge;
    } else {
        return categoriesMerge;
    }
}


