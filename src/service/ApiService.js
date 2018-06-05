import axios from 'axios';

//const baseUrl = 'https://week-menu-api.herokuapp.com/';
const baseUrl = 'http://localhost:3002/'

const ApiService = {
    get: (resourceName) => {
        return axios.get(baseUrl + resourceName);
    },

    post: (resourceName, object) => {
        const callBack = (resolve, reject) => {
            axios.post(baseUrl + resourceName, object)
                .then( (response) => {
                    resolve(response);
                }).catch( reason => {
                    if(reason.response) {
                        reject(reason.response.data);
                    } else {
                        reject(reason);
                    }
                });
        };
    	return new Promise(callBack);
    }

}

export default ApiService
