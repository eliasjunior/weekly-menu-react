import { getBaseUrl } from "./TemporaryAPI";
import axios from "axios";

export async function get(resourceName) {
  try {
    const response = await axios.get(getBaseUrl() + resourceName);
    const recipes = response.data;
    return recipes;
  } catch ({ response }) {
    throw response;
  }
}
export async function post(resourceName, object) {
  try {
    //remove products from recipe
    const { name, products } = object;
    const recProds = products.map((prod) => prod._id);
    const requestRec = {
      name,
      recProds,
    };
    //save recipe
    const response = await axios.post(getBaseUrl() + resourceName, requestRec);
    // should return {_id: newID, name}
    // simulating back-end
    const result = {
      _id: response.data._id,
      name: response.data.name,
      recProds,
      products, // with _id
    };

    return result;
  } catch ({ response }) {
    throw response;
  }
}
export async function put(resourceName, object) {
  try {
    const { name, products, _id } = object;
    const recProds = products.map((prod) => prod._id);
    const requestRec = {
      name,
      _id,
      recProds,
    };
    const response = await axios.put(getBaseUrl() + resourceName, requestRec);
    // simulating back-end
    const result = {
      _id,
      name,
      recProds,
      products, // with _id
    };
    return response.status;
  } catch ({ response }) {
    throw response;
  }
}
