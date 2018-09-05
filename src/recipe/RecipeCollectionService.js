const reducerNewList = (item, list) => {
    // TODO add deep array copy
    if (!list) {
        list = [];
    }
    list.push(item);
    const newList = list.reduce((acc, curItem) => {
        const isIn = acc
            .find(itemIn => itemIn._id === curItem._id)

        if (!isIn) {
            acc.push(curItem);
        }
        return acc;
    }, [list[0]]);
    return newList;
}

const RecipeCollectionService = {
    addItem(item, list) {
        const categories = reducerNewList(item.category, list);
        const theCat = categories.find(cat => cat._id === item.category._id);

        theCat.products = reducerNewList(item.product, theCat.products);

        return categories;
    },
    removeItem(item, list) {
        // TODO deep copy here too  
        const cat = list
            .filter(cat => cat._id === item.category._id)
            [0];

        if (cat.products.length > 1) {
            cat.products =
                cat.products.filter(prod => prod._id !== item.product._id)
            return list
        } else {
            return list.filter(cat => cat._id !== item.category._id)
        }
    }
}

export default RecipeCollectionService;