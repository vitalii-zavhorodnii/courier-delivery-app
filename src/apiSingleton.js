import apiFactory from './api';
import config from './config';

const api = apiFactory({
    apiUrl  : config.API_URL,
    prefix  : config.API_PREFIX,
    onError : error => console.log('Connection error: ', error)
});

export default api;
