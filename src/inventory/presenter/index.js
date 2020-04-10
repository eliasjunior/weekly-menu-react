import Inventory from "../use-cases";
import { get, post, put } from "service/TemporaryAPI";

import ProductGateway from "inventory/use-cases/ProductGateway";

const { getProducts, saveProduct, updateProduct } = ProductGateway({
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
