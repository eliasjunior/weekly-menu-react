import axios from 'axios';

const baseUrl = 'https://week-menu-api.herokuapp.com/';
//const baseUrl = 'http://localhost:3002/'

const ApiService = {

    get: (resourceName) => {
        return axios.get(baseUrl + resourceName);
    },

    post: (resourceName, object) => {
    	return axios.post(baseUrl + resourceName, object);
    }

}

export default ApiService 