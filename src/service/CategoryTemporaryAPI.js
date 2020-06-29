import { getBaseUrl } from "./TemporaryAPI";
import axios from "axios";

export async function get(resourceName) {
  try {
    const response = await axios.get(getBaseUrl() + resourceName);
    return response.data;
  } catch ({ response }) {
    throw response;
  }
}
export async function put(resourceName, object) {
  try {
    const response = await axios.put(getBaseUrl() + resourceName, object);
    return response.data;
  } catch ({ response }) {
    throw response;
  }
}
export async function post(resourceName, object) {
  try {
    const response = await axios.post(getBaseUrl() + resourceName, object);
    return response.data;
  } catch ({ response }) {
    throw response;
  }
}

export async function linkProds(parentList, idName) {
  const prodResponse = await axios.get(getBaseUrl() + "products");
  const prods = prodResponse.data;

  return parentList.map((parent) => {
    parent.products = prods.filter((prod) => prod[idName] === parent.id);
    return parent;
  });
}
