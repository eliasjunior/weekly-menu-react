import UtilCollection from './UtilCollectionService';
const RecipePageUtilService = {
    matchProductRecipe(recCategories, categories) {
        const recProds = recCategories.reduce( (acc, catItem) => {
            acc = acc.concat(catItem.products)
            return acc;
        }, []);
        let products = categories.reduce( (acc, catItem) => {
            acc = acc.concat(catItem.products);
            return acc;
        }, []);

        // sort for binary search
        products = products
            .sort((prodA, prodB) => prodA.name > prodB.name ? 1 : -1);
        
        recProds.forEach(product => {
            UtilCollection.findItemBinarySearch(product.name, products);
        });
        return categories;
    },
    
    filterProdSelected(categories) {
        let deepCopy = categories.map(cat => ({...cat}));

        return deepCopy
            .filter(category => {
                category.products = category.products.filter(product => product.checked)

            return category.products.length ? true : false;
        });
    }
}

export default RecipePageUtilService;