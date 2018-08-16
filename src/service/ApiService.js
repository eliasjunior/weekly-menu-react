import axios from 'axios';
//const baseUrl = 'https://week-menu-api.herokuapp.com/';
const baseUrl = 'http://localhost:3002/';

const ApiService = {
    get: (resourceName) => {
        return axios.get(baseUrl + resourceName)
            .then(response => response.data)
            .catch(reason => reason);
    },
    post: (resourceName, object) => {
        return axios
            .post(baseUrl + resourceName, object)
            .then(response => response.data)
            .catch(reason => reason.response ? reason.response.data : reason);
    },
    put(resourceName, object) {
        return axios.put(baseUrl + resourceName, object);
    }
}

export default ApiService
