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
        let half = Math.floor(list.length / 2);

        while (floor < ceil) {
            if (list[half].name === targetName) {
                return list[half];
            } else if (targetName < list[half].name) {
                ceil = half;
            } else {
                floor = half;
            }
            half = Math.floor((ceil + floor) / 2);
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