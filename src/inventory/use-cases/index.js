import { get, post, put } from "service/CategoryTemporaryAPI";
import CategoryGateway from "./CategoryGateway";

const {
  getCategories,
  saveCategoryAsync,
  updateCategoryAsync,
  getCategoryAsync,
  updateProductInCategory
} = CategoryGateway({
  httpAPI: { get, post, put }
});

export default {
  getCategories,
  saveCategoryAsync,
  updateCategoryAsync,
  getCategoryAsync,
  updateProductInCategory
};
