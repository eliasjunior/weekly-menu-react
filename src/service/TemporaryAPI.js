import axios from "axios";
import { requiredParameter } from "common/Util";
// this is a temporaty soluction until refactor the Back-end
export const getBaseUrl = () => {
  const sandbox = "https://yje3h.sse.codesandbox.io/";
  const local = "http://localhost:3004/";
  const heroku = "https://week-menu-api.herokuapp.com/";
  console.log("(window.location.href", window.location.href);

  if (window.location.href.indexOf("localhost") !== -1) {
    return local;
  } else if (window.location.href.indexOf("herokuapp") !== -1) {
    return heroku;
  } else {
    return sandbox;
  }
};

export async function get(resourceName) {
  try {
    const response = await axios.get(getBaseUrl() + resourceName);
    const recipes = response.data;
    return recipes;
  } catch ({ response }) {
    console.error("response", response);
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
    console.error("response", response);
    throw response;
  }
}
export async function post(resourceName, object) {
  try {
    const response = await axios.post(getBaseUrl() + resourceName, object);
    return response.data;
  } catch ({ response }) {
    console.error("response", response);
    throw response;
  }
}
