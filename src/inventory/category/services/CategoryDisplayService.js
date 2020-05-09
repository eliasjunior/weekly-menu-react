import { parentComponent } from "common/AppConstant";

const CategoryDisplayHelper = {
  recipeSelectionBtn(parent) {
    return {
      display: parent === parentComponent.SHOPPING_LIST_PAGE,
    };
  },
  categoryBtns(parentLocation) {
    return {
      display:
        parentLocation === parentComponent.INVENTORY_PAGE ||
        parentLocation === parentComponent.RECIPE_PAGE,
    };
  },
  categoryLineHide(parent) {
    return {
      display: parent === parentComponent.RECIPE_LIST_PAGE,
    };
  },
  productCheckboxBtn(parent) {
    return {
      display:
        parent === parentComponent.SHOPPING_LIST_PAGE ||
        parent === parentComponent.RECIPE_PAGE,
    };
  },
  crudActions(parent) {
    return {
      display: parent === parentComponent.INVENTORY_PAGE,
    };
  },
  selectAllBtn(parent) {
    return {
      display: parent === parentComponent.RECIPE_PAGE,
    };
  },
  filterInputVisibility(parent) {
    return {
      display: parent !== parentComponent.RECIPE_LIST_PAGE,
    };
  },
};
export default CategoryDisplayHelper;
