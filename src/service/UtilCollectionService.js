import CloneDeep from 'lodash.clonedeep'

const UtilCollectionService = {
    addItem(itemToBeAdded, list) {
        const categories = reducerNewList(itemToBeAdded.category, list);
        const categorySelected = categories.find(cat => cat._id === itemToBeAdded.category._id);

        categorySelected.products = reducerNewList(itemToBeAdded.product, categorySelected.products);

        return categories;
    },
    removeItem(itemToBeRemoved, list) {
        const categorySelected = list
            .filter(cat => cat._id === itemToBeRemoved.category._id)
            .shift();

        if (categorySelected.products.length > 1) {
            categorySelected.products =
                categorySelected.products.filter(prod => prod._id !== itemToBeRemoved.product._id)
            // mutate the list, // TODO add deep copy if it's easy
            return list
        } else {
            const removeCategoryIfThereISNotProduct = () => {
                return list.filter(cat => cat._id !== itemToBeRemoved.category._id)
            };
            return removeCategoryIfThereISNotProduct();
        }
    },
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
    getCategorySelected(stateCategory) {
        const categories = CloneDeep(stateCategory)

        return categories.filter(cat => {
            return cat.products.filter(prod => prod.checked).length > 0
        }).map(cat => {
            cat.products = cat.products.filter(prod => prod.checked)
            return cat
        })
    }
}
function reducerNewList(item, list) {
    const createANewList = (newList, currentItem) => {
        const isItemIn = newList
            .find(itemIn => itemIn._id === currentItem._id);

        if (!isItemIn) {
            newList.push(currentItem);
        }
        return newList;
    }
    // TODO add deep array copy, but need to add test before, it could break it
    if (!list) {
        list = [];
    }
    list.push(item);

    const newList = list.reduce(createANewList, [list[0]]);
    return newList;
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