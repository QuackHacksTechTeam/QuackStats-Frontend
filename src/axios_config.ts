import axios from 'axios';

const API_URL = "https://localhost:3000"

const axiosInstance = axios.create({
  baseURL: API_URL, 
});

export default axiosInstance;


