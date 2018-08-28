import { AppConstant } from "./common/AppConstant";

const checkBoxSelectionPage = ({
    '/products': false,
    '/shopping': true,
    '/recipe/create': true
});
const crudActions = ({
    '/products': true,
    '/shopping': false,
    '/recipe/create': true
});

const CategoryDisplayService = {
    recipeSelectionBtn(page) {
        return {
            display: page === AppConstant.SHOPPING
        }
    },
    categoryBtns(page) {
        return {
            display: page === AppConstant.PRODUCTS || page === AppConstant.NEW_RECIPE
        }
    },
    productCheckBtn(page) {
        return {
            display: checkBoxSelectionPage[page] 
        }
    },
    crudActions(page) {
        return {
            display: crudActions[page] 
        }
    },
    
}
export default CategoryDisplayService;