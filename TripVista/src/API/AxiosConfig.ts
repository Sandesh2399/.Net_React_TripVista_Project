import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7191'
    
});

export default axiosInstance;