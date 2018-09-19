import { AppConstant } from "../../common/AppConstant";

const CategoryDisplayService = {
    recipeSelectionBtn(parentComponent) {
        return {
            display: parentComponent === AppConstant.PARENT_COMPONENT.SHOPPING_LIST_PAGE
        }
    },
    categoryBtns(parentComponent) {
        return {
            display: parentComponent === AppConstant.PARENT_COMPONENT.INVENTORY_PAGE 
                || parentComponent === AppConstant.PARENT_COMPONENT.RECIPE_PAGE
        }
    },
    productCheckboxBtn(parentComponent) {
        return {
            display: parentComponent === AppConstant.PARENT_COMPONENT.SHOPPING_LIST_PAGE ||
            parentComponent === AppConstant.PARENT_COMPONENT.RECIPE_PAGE
        }
    },
    crudActions(parentComponent) {
        return {
            display: parentComponent === AppConstant.PARENT_COMPONENT.INVENTORY_PAGE
        }
    },
    selectAllBtn(parentComponent) {
        return {
            display: parentComponent === AppConstant.PARENT_COMPONENT.RECIPE_PAGE ||
            parentComponent === AppConstant.PARENT_COMPONENT.SHOPPING_LIST_PAGE
        }
    }
}
export default CategoryDisplayService;