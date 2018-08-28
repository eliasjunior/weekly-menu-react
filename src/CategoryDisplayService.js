import { AppConstant } from "./common/AppConstant";

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
    }
}
export default CategoryDisplayService;