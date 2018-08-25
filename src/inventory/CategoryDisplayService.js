import { AppConstant } from "../common/AppConstant";

const CategoryDisplayService = {
    recipeSelectionBtn(page) {
        return {
            display: page === AppConstant.SHOPPING
        }
    }
}
export default CategoryDisplayService;