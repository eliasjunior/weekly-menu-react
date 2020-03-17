import { AppConstant } from "common/AppConstant";

const CategoryDisplayHelper = {
  recipeSelectionBtn(parentComponent) {
    return {
      display:
        parentComponent === AppConstant.PARENT_COMPONENT.SHOPPING_LIST_PAGE
    };
  },
  categoryBtns(parentComponent) {
    return {
      display:
        parentComponent === AppConstant.PARENT_COMPONENT.INVENTORY_PAGE ||
        parentComponent === AppConstant.PARENT_COMPONENT.RECIPE_PAGE
    };
  },
  categoryLineHide(parentComponent) {
    return {
      display: parentComponent === AppConstant.PARENT_COMPONENT.RECIPE_LIST_PAGE
    };
  },
  productCheckboxBtn(parentComponent) {
    return {
      display:
        parentComponent === AppConstant.PARENT_COMPONENT.SHOPPING_LIST_PAGE ||
        parentComponent === AppConstant.PARENT_COMPONENT.RECIPE_PAGE
    };
  },
  crudActions(parentComponent) {
    return {
      display: parentComponent === AppConstant.PARENT_COMPONENT.INVENTORY_PAGE
    };
  },
  selectAllBtn(parentComponent) {
    return {
      display:
        parentComponent === AppConstant.PARENT_COMPONENT.RECIPE_PAGE ||
        parentComponent === AppConstant.PARENT_COMPONENT.SHOPPING_LIST_PAGE
    };
  },
  filterInputVisibility(parentComponent) {
    return {
      display: parentComponent !== AppConstant.PARENT_COMPONENT.RECIPE_LIST_PAGE
    };
  }
};
export default CategoryDisplayHelper;
