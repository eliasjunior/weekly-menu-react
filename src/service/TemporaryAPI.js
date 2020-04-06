import axios from "axios";
import { productsMapper } from "inventory/use-cases/ProductMapper";
// this is a temporaty soluction until refactor the Back-end
export const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3004/"
    : "https://week-menu-api.herokuapp.com/";
};

export async function getProducts() {
  try {
    // Im not using mapper here because I'll treat this later
    const responseProd = await axios.get(getBaseUrl() + "products");
    return productsMapper(responseProd.data);
  } catch (error) {
    throw error;
  }
}
