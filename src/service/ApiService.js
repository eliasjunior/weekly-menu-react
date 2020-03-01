import axios from "axios";
import { getErrorFromResponse } from "error-handlers/ErrorUtil";

const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3004/"
    : "https://week-menu-api.herokuapp.com/";
};

const ApiService = {
  get: resourceName => {
    return axios
      .get(getBaseUrl() + resourceName)
      .then(response => response.data)
      .catch(reason => getErrorFromResponse(reason));
  },
  post: (resourceName, object) => {
    return axios
      .post(getBaseUrl() + resourceName, object)
      .then(response => response.data)
      .catch(reason => getErrorFromResponse(reason));
  },
  put(resourceName, object) {
    return axios
      .put(getBaseUrl() + resourceName + "/" + object._id, object)
      .then(response => response.data)
      .catch(reason => getErrorFromResponse(reason));
  }
};

export default ApiService;
