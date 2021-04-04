import { get, post, put } from "service/HttpAPI";
import CategoryDataAPI from "./CategoryDataAPI";

const {
  getCategories,
  saveCategoryAsync,
  updateCategoryAsync,
  getCategoryAsync,
  updateProductInCategory,
} = CategoryDataAPI({
  httpAPI: { get, post, put },
});

export default {
  getCategories,
  saveCategoryAsync,
  updateCategoryAsync,
  getCategoryAsync,
  updateProductInCategory,
};
