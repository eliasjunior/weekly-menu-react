import axios from "axios";
// this is a temporaty soluction until refactor the Back-end
export const getBaseUrl = () => {
  const local = "http://localhost:8080/v1/";
  const heroku = "https://week-menu-api.herokuapp.com/";
  console.log("(window.location.href", window.location.href);

  if (window.location.href.indexOf("localhost") !== -1) {
    return local;
  } else {
    return heroku;
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
  try {
    const response = await axios.put(getBaseUrl() + resourceName, object);
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
