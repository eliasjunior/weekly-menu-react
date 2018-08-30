import { AppConstant } from "./common/AppConstant";
const CategoryDisplayService = {
    recipeSelectionBtn(page) {
        return {
            display: page === AppConstant.PATH.SHOPPING
        }
    },
    categoryBtns(page) {
        return {
            display: page === AppConstant.PATH.PRODUCTS || page === AppConstant.PATH.NEW_RECIPE
        }
    },
    productCheckBtn(page) {
        return {
            display: page === AppConstant.PATH.SHOPPING || page === AppConstant.PATH.NEW_RECIPE
        }
    },
    crudActions(page) {
        return {
            display: page === AppConstant.PATH.PRODUCTS || page === AppConstant.PATH.PRODUCTS_CREATE
        }
    },
    
}
export default CategoryDisplayService;