import ApiService from "service/ApiService";
import { requiredParameter } from "common/Util";
import {
  categoryMapper,
  categoryConverter,
  categoryListMapper
} from "./categoryMapper";

export default {
  getCategories: async () => {
    try {
      const data = await ApiService.get("categories");
      return categoryListMapper(data);
    } catch (error) {
      throw error;
    }
  },
  saveCategoryAsync: async category => {
    try {
      const data = await ApiService.post(
        "categories",
        categoryConverter(category)
      );
      return categoryMapper(data);
    } catch (error) {
      throw error;
    }
  },
  updateCategoryAsync: async category => {
    try {
      const data = await ApiService.put(
        "categories",
        categoryConverter(category)
      );
      return categoryMapper(data);
    } catch (error) {
      throw error;
    }
  },
  getCategoryAsync: async id => {
    try {
      const data = await ApiService.get("categories/" + id);
      return categoryMapper(data);
    } catch (error) {
      throw error;
    }
  },
  updateProductInCategory
};

function updateProductInCategory(
  category = requiredParameter("category"),
  product = requiredParameter("product")
) {
  const products = category.products.reduce((acc, prod) => {
    if (prod.id !== product.id) {
      acc.push(prod);
    } else {
      acc.push(product);
    }
    return acc;
  }, []);
  category.products = products;
  return category;
}
