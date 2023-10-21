import axios from 'axios'


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PROXY
})

axiosInstance.interceptors.request.use((config) => {
    config.headers.authorization = `Token ${localStorage.getItem('token')}`;
    return config;
})

export default axiosInstance;