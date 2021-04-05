import Inventory from "../data-access";
import { get, post, put } from "service/HttpAPI";

import ProductDataAPI from "inventory/data-access/ProductDataAPI";

const { getProducts, saveProduct, updateProduct } = ProductDataAPI({
  httpAPI: { get, post, put },
});

const { getCategories, updateCategoryAsync, saveCategoryAsync } = Inventory;

export default {
  getCategories,
  putCategory: updateCategoryAsync,
  postCategory: saveCategoryAsync,
  getProducts,
  postProduct: saveProduct,
  putProduct: updateProduct,
};
