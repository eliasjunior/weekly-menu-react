const CategoryListUtil = {
    // TODO add test for it
    // Also change categoty list to call here
    isListChanged(_prevCats_, categories , propToCheck) {
        const reducerCount = (acc, item) => {
            const totalSelected = item.products.filter(prod => prod[propToCheck]).length
            return acc + totalSelected;
        }
        const totalP = _prevCats_.reduce(reducerCount, 0)
        const totalC = categories.reduce(reducerCount, 0)

        return  totalC !== totalP;
    }
}

export default CategoryListUtil;