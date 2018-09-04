import { AppConstant } from "../../common/AppConstant";
const CategoryDisplayService = {
    recipeSelectionBtn(page) {
        return {
            display: page === AppConstant.PATH.SHOPPING
        }
    },
    categoryBtns(page) {
        return {
            display: page === AppConstant.PATH.DEFAULT_ROUTE || page === AppConstant.PATH.NEW_RECIPE
        }
    },
    productCheckBtn(page) {
        return {
            display: page === AppConstant.PATH.SHOPPING ||
                page === AppConstant.PATH.NEW_RECIPE
        }
    },
    crudActions(page) {
        return {
            display: page === AppConstant.PATH.DEFAULT_ROUTE
        }
    },
    categoryNewBtn(page) {
        return {
            display: page === AppConstant.PATH.DEFAULT_ROUTE
        }
    },
    productSecondaryLabel(page) {
        return {
            display: page === AppConstant.PATH.RECIPE_LIST
        }
    }

}
export default CategoryDisplayService;