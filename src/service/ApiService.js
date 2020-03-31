import axios from "axios";

const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3004/"
    : "https://week-menu-api.herokuapp.com/";
};

const ApiService = {
  async get(resourceName) {
    try {
      const response = await axios.get(getBaseUrl() + resourceName);
      return response.data;
    } catch ({ response }) {
      throw response;
    }
  },
  async post(resourceName, object) {
    try {
      const response = await axios.post(getBaseUrl() + resourceName, object);
      return response.data;
    } catch ({ response }) {
      throw response;
    }
  },
  async put(resourceName, object) {
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
};

export default ApiService;
