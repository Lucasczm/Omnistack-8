import axios from 'axios';

const api = axios.create({ baseURL: 'http://192.168.1.123:3137' });
export default api;
