import axios from 'axios';

const api = axios.create({
    baseURL:'http://127.0.0.1:3007',
    timeout:3000
})

api.interceptors.request.use(function (config){
    // console.log(config);
    return config;
},function (error){
    return Promise.reject(error);
});

api.interceptors.response.use(function(response) {
    return response;
},function(error) {
    return Promise.reject(error);
});

export default api;