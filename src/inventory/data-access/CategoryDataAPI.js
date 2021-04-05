import { requiredParameter } from "common/Util";
import {
  categoryMapper,
  categoryConverter,
  categoryListMapper,
} from "./CategoryMapper";

export default function CategoryDataAPI({ httpAPI }) {
  return {
    getCategories: async () => {
      try {
        const data = await httpAPI.get("categories");

        return categoryListMapper(data);
      } catch (error) {
        throw error;
      }
    },
    saveCategoryAsync: async (category) => {
      try {
        const data = await httpAPI.post(
          "categories",
          categoryConverter(category, true)
        );
        return categoryMapper(data);
      } catch (error) {
        throw error;
      }
    },
    updateCategoryAsync: async (category) => {
      try {
        await httpAPI.put("categories", categoryConverter(category));
      } catch (error) {
        throw error;
      }
    },
    getCategoryAsync: async (id) => {
      try {
        const data = await httpAPI.get("categories/" + id);
        return categoryMapper(data);
      } catch (error) {
        throw error;
      }
    },
    updateProductInCategory,
  };
}

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
