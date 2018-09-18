import CloneDeep from 'lodash.clonedeep'

const UtilCollectionService = {
    recipeToAdd(recipe) {
        return {
            name: recipe.name,
            _id: recipe._id,
            categories: recipe.categories.map(category => {
                return {
                    name: category.name,
                    _id: category._id,
                    products: category.products.map(product => {
                        return {
                            name: product.name,
                            _id: product._id
                        }
                    })
                }
            })
        }
    },
    addRecipe(recipeToBeAdded, recipes) {
        const result = [...recipes];
        const isNotIn = !recipes.find(rec => rec.name === recipeToBeAdded.name);

        if (isNotIn) {
            result.push(recipeToBeAdded);
        }
        return result;
    },
    removeRecipe(recipeToBeRemoved, recipes) {
        return recipes.filter(rec => rec.name !== recipeToBeRemoved.name);
    },

    findItemBinarySearch(targetName, list) {
        let floor = 0;
        let ceil = list.length;

        while (floor < ceil) {
            const distance = ceil - floor;
            let half = Math.floor(distance / 2) + floor;

            if (list[half].name === targetName) {
                return list[half];
            } else if (targetName < list[half].name) {
                //the ? is to avoid same index  to get into infinity loop
                ceil = ceil !== half ? half : half - 1;
            } else {
                //the ? is to avoid same index  to get into infinity loop
                floor = floor !== half ? half : half + 1;
            }
        }
        return false;
    },
    getAllSortCategoriesRecipe(recipes) {
        return recipes
            .reduce(reducerAllCategories, [])
            .sort((catA, catB) => catA.name > catB.name ? 1 : -1);
    },
    getAllSortProducts(categories) {
        return categories
            .reduce(reducerAllProducts, [])
            .sort((prodA, prodB) => prodA.name > prodB.name ? 1 : -1);
    },
    updateProductsSelection(stateCategory, selected) {
        const categories = CloneDeep(stateCategory)
        const categoryToUpdate = categories.find(cat => cat._id === selected.catId)

        const updatedProds = categoryToUpdate.products
            .map(prod => {
                prod.checked = selected.checked;
                return prod;
            });
        categoryToUpdate.products = updatedProds;

        return categories;
    },
    updateProductSelection(stateCategory, selected) {
        const category = selected.category;
        const product = selected.product;

        const categories = CloneDeep(stateCategory)
        categories.forEach(cat => {
            if (cat._id === category._id) {
                cat.products.forEach(prod => {
                    if (prod._id === product._id) {
                        prod.checked = selected.checked;
                    }
                })
            }
        })
        return categories;
    },
    getCategorySelected(stateCategories) {
        const categories = CloneDeep(stateCategories)

        return categories.filter(cat => {
            return cat.products.filter(prod => prod.checked).length > 0
        }).map(cat => {
            cat.products = cat.products.filter(prod => prod.checked)
            return cat
        })
    },
    getCatsSelectedInRecipes(recipes) {
        const filterCategory = (recipe) => {
            recipe.categories = this.getCategorySelected(recipe.categories)
            return recipe.categories.length > 0
        };

        return CloneDeep(recipes)
            .filter(filterCategory);
    },
    refreshSelectedItemsShopList(existingCatsOfShopList, requestedCats) {
        const allProdsExistingCats = UtilCollectionService.getAllSortProducts(existingCatsOfShopList)

        const addCheckToProds = product => {
            if (UtilCollectionService.findItemBinarySearch(product.name, allProdsExistingCats)) {
                product.checked = true;
            }
            return product;
        }

        return requestedCats.map(category => {
            category.products = category.products.map(addCheckToProds);
            return category;
        });
    }
}
function reducerAllCategories(acc, recipe) {
    acc = acc.concat(recipe.categories);
    return acc;
}

function reducerAllProducts(acc, category) {
    const newProducts = category.products.map(product => product);
    acc = acc.concat(newProducts);
    return acc;
}

export default UtilCollectionService;