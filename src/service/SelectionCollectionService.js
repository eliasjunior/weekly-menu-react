const SelectionCollectionService = {
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
        const isNotIn = !recipes.find( rec => rec.name === recipeToBeAdded.name);

        if(isNotIn) {
            result.push(recipeToBeAdded);
        }
        return result;
    },
    removeRecipe(recipeToBeRemoved, recipes) {
        const result = [...recipes];
        return recipes.filter(rec => rec.name !== recipeToBeRemoved.name);
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

export default SelectionCollectionService;