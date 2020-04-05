import { getBaseUrl, linkProds } from "./TemporaryAPI";
import axios from "axios";

export async function get(resourceName) {
  try {
    const response = await axios.get(getBaseUrl() + resourceName);
    const result = response.data;
    return linkProds(result, "catId");
  } catch ({ response }) {
    throw response;
  }
}
export async function put(resourceName, object) {
  try {
    const response = await axios.put(
      getBaseUrl() + resourceName + "/" + object.id,
      object
    );
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
