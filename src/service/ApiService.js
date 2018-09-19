import axios from 'axios';
//import runtimeEnv from '@mars/heroku-js-runtime-env';

//const env = runtimeEnv();
//const baseUrl = env.NODE_ENV === 'development' ? 'http://localhost:3002/' : 'https://week-menu-api.herokuapp.com/';
const baseUrl ='https://week-menu-api.herokuapp.com/'

const ApiService = {
    get: (resourceName) => {
        return axios.get(baseUrl + resourceName)
            .then(response => response.data)
            .catch(reason => getErrorFromResponse(reason));
    },
    post: (resourceName, object) => {
        return axios
            .post(baseUrl + resourceName, object)
            .then(response => response.data)
            .catch(reason => getErrorFromResponse(reason));
    },
    put(resourceName, object) {
        return axios
                .put(baseUrl + resourceName, object)
                .then(response => response.data)
                .catch(reason => getErrorFromResponse(reason));    
    }
}
function getErrorFromResponse(reason) {
    const response = reason['response'];
    if (response && response.status === 404) {
        console.log('return 404')
        return Promise.reject({ message: 'Not Found' });
    } else {
        const error = reason.response ? reason.response.data : reason;
        return Promise.reject(error);
    }
}
export default ApiService
