import axios from 'axios';

const BASE_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;
