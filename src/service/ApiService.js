import axios from "axios";
import { httpError } from "../app-redux/actions/ErrorHandlerAction";
import ErrorReducer from "../app-redux/reducers/ErrorHandlerReducer";
import {
  categoryMapper,
  categoryConverter,
  categoryListMapper
} from "inventory/use-cases/categoryMapper";

const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3004/"
    : "https://week-menu-api.herokuapp.com/";
};

const ApiService = {
  async get(resourceName) {
    try {
      const response = await axios.get(getBaseUrl() + resourceName);
      return categoryListMapper(response.data);
    } catch (error) {
      ErrorReducer(httpError(error));
    }
  },
  async post(resourceName, object) {
    try {
      const response = await axios.post(
        getBaseUrl() + resourceName,
        categoryConverter(object)
      );
      return categoryMapper(response.data);
    } catch (error) {
      ErrorReducer(httpError(error));
    }
  },
  async put(resourceName, object) {
    try {
      const response = await axios.put(
        getBaseUrl() + resourceName + "/" + object.id,
        categoryConverter(object)
      );
      return categoryMapper(response.data);
    } catch (error) {
      ErrorReducer(httpError(error));
    }
  }
};

export default ApiService;
