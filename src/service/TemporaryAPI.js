import axios from "axios";
import { getServerUrl } from "common/Util";

export async function get(resourceName) {
  try {
    const response = await axios.get(getServerUrl() + resourceName);
    const recipes = response.data;
    return recipes;
  } catch ({ response }) {
    console.error("get function temporary API: ", response);
    throw response;
  }
}

export async function put(resourceName, object) {
  try {
    const response = await axios.put(getServerUrl() + resourceName, object);
    return response.data;
  } catch ({ response }) {
    console.error("put function temporary API: ", response);
    throw response;
  }
}
export async function post(resourceName, object) {
  try {
    const response = await axios.post(getServerUrl() + resourceName, object);
    return response.data;
  } catch ({ response }) {
    console.error("post function temporary API: ", response);
    throw response;
  }
}
