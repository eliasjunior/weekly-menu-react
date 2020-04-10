import { requiredParameter } from "common/Util";
import {
  productConverter,
  productMapper,
  productListMapper,
} from "./ProductMapper";

export default function ProductGateway({ httpAPI }) {
  return {
    getProducts: async () => {
      try {
        const data = await httpAPI.get("products");

        return productListMapper(data);
      } catch (error) {
        throw error;
      }
    },
    saveProduct: async (product) => {
      try {
        const data = await httpAPI.post("products", productConverter(product));
        return productMapper(data);
      } catch (error) {
        throw error;
      }
    },
    updateProduct: async (product) => {
      try {
        const data = await httpAPI.put("products", productConverter(product));
        return productMapper(data);
      } catch (error) {
        throw error;
      }
    },
    getProduct: async (id = requiredParameter("id")) => {
      try {
        const data = await httpAPI.get("products/" + id);
        return productMapper(data);
      } catch (error) {
        throw error;
      }
    },
  };
}
