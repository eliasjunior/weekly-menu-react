import axios from 'axios';

const baseUrl = 'https://week-menu-api.herokuapp.com/';

const ApiService = {

    get: (resourceName)=> {
        return axios.get(baseUrl + resourceName);
    }


}

export default ApiService 