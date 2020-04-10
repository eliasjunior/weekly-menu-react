import axios from "axios";
import { requiredParameter } from "common/Util";
// this is a temporaty soluction until refactor the Back-end
export const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3004/"
    : "https://week-menu-api.herokuapp.com/";
};

export async function get(resourceName) {
  try {
    const response = await axios.get(getBaseUrl() + resourceName);
    const recipes = response.data;
    return recipes;
  } catch ({ response }) {
    throw response;
  }
}

export async function put(resourceName, object) {
  const { _id = requiredParameter("_id") } = object;
  try {
    const response = await axios.put(
      getBaseUrl() + resourceName + "/" + _id,
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
