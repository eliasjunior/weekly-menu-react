import { getServerUrl } from "common/Util";
import axios from "axios";

export async function get(resourceName) {
  try {
    const response = await axios.get(getServerUrl() + resourceName);
    return response.data;
  } catch ({ response }) {
    throw response;
  }
}
export async function put(resourceName, object) {
  try {
    const response = await axios.put(getServerUrl() + resourceName, object);
    return response.data;
  } catch ({ response }) {
    throw response;
  }
}
export async function post(resourceName, object) {
  try {
    const response = await axios.post(getServerUrl() + resourceName, object);
    return response.data;
  } catch ({ response }) {
    throw response;
  }
}

export async function linkProds(parentList, idName) {
  const prodResponse = await axios.get(getServerUrl() + "products");
  const prods = prodResponse.data;

  return parentList.map((parent) => {
    parent.products = prods.filter((prod) => prod[idName] === parent.id);
    return parent;
  });
}
