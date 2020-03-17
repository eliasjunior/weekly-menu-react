import Inventory from "../use-cases";

const {
  getCategories,
  updateCategoryAsync,
  saveCategoryAsync,
  updateProductInCategory
} = Inventory;

export default {
  getCategories,
  putCategory: updateCategoryAsync,
  postCategory: saveCategoryAsync,
  updateProductInCategory
};
