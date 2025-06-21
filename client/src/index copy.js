import axios from "axios";
import errorParser from "../utils/errorParser";
import { toast } from "sonner";

const API_URL = 'http://localhost:5003';


const api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

api.interceptors.response.use(config => {
    return config;
}, async (err) => {
    if(err.response.status === 401) {
        try {
            const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
        } catch (error) {
            const errorMessage = errorParser(error);
            toast.error(errorMessage);
        };
    };
    return Promise.reject(err);
});

export default api;