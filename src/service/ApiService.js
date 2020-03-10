import axios from "axios";
import { httpError } from "../app-redux/actions/ErrorHandlerAction";
import ErrorReducer from "../app-redux/reducers/ErrorHandlerReducer";

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
      .catch(reason => ErrorReducer(httpError(reason)));
  },
  post: (resourceName, object) => {
    return axios
      .post(getBaseUrl() + resourceName, object)
      .then(response => response.data)
      .catch(reason => reason);
  },
  async put(resourceName, object) {
    try {
      const response = await axios.put(
        getBaseUrl() + resourceName + "/" + object._id,
        object
      );
      return response.data;
    } catch (reason) {
      throw reason.response;
    }
  }
};

export default ApiService;
