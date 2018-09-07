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
        products = products.sort( (prodA, prodB) => {
            if(prodA.name > prodB.name) {
                return 1
            } else {
                return - 1
            }
        });
        
        recProds.forEach(product => {
            this.findProductBinarySearch(product.name, products);
        });
        return categories;
    },
    findProductBinarySearch(target, products) {
        let floor = 0;
        let ceil = products.length;
        let half = Math.floor(products.length/2);
    
        // avoid infinity if there is some thing wrong in the algorithm below
        let ii = 0;
        while(floor < ceil && ii < 1000) {
            if(products[half].name === target) {
                products[half].checked = true;
                return products[half];
            } else if(target < products[half].name ){
                ceil = half;
            } else {
                floor = half;
            }
            half = Math.floor((ceil + floor)/2) ;
    
            ii++
        }
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