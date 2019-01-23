import axios from 'axios';
// import runtimeEnv from '@mars/heroku-js-runtime-env';
//const env = runtimeEnv();
// const baseUrl = env.NODE_ENV === 'development' ? 'http://localhost:3002/' : 'https://week-menu-api.herokuapp.com/';
//const baseUrl = 'https://week-menu-api.herokuapp.com/'
console.log('***********', process.env.REACT_APP_API_URL)
const baseUrl = process.env.REACT_APP_API_URL

const ApiService = {
    get: (resourceName) => {
        return axios.get(baseUrl + resourceName, {headers: {
            'Authorization': localStorage.getItem("JWT")
          }})
            .then(response => response.data)
            .catch(reason => getErrorFromResponse(reason));
    },
    post: (resourceName, object) => {
        return axios
            .post(baseUrl + resourceName, object, {headers: {
                'Authorization': localStorage.getItem("JWT")
              }})
            .then(response => response.data)
            .catch(reason => getErrorFromResponse(reason));
    },
    put(resourceName, object) {
        return axios
                .put(baseUrl + resourceName, object, {headers: {
                    'Authorization': localStorage.getItem("JWT")
                  }})
                .then(response => response.data)
                .catch(reason => getErrorFromResponse(reason));    
    }
}
function getErrorFromResponse(reason) {
    const response = reason['response'];
    if (response) {
        if (response.status === 404) {
            console.log('return 404')
            return Promise.reject({ message: 'Not Found' });
        } else if (response.status === 401) {
            window.location = "/login";
        }
    } else {
        const error = reason.response ? reason.response.data : reason;
        return Promise.reject(error);
    }
}
export default ApiService
