import UtilCollection from './UtilCollectionService';
import CloneDeep from 'lodash.clonedeep';

const RecipePageUtilService = {
    matchProductRecipeAndAddCheck(recCategories, categories) {
        const reducerAllProducts =  (acc, catItem) => {
            acc = acc.concat(catItem.products)
            return acc;
        };
        const allProductsRecipe = recCategories.reduce(reducerAllProducts, []);

        let allProducts = categories.reduce(reducerAllProducts, []);

        // sort for binary search
        allProducts = allProducts
            .sort((prodA, prodB) => prodA.name > prodB.name ? 1 : -1);
        
        allProductsRecipe.forEach(product => {
            const productFromList = UtilCollection
                .findItemBinarySearch(product.name, allProducts)
            if(productFromList) {
                productFromList.checked = true;
            };
        });
        return categories;
    },
    
    filterProdSelected(categories) {
        let deepCopy = CloneDeep(categories);

        return deepCopy
            .filter(category => {
                category.products = category.products.filter(product => product.checked)

            return category.products.length ? true : false;
        });
    }
}

export default RecipePageUtilService;