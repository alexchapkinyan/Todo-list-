import axios from 'axios';

const API_URL = 'http://localhost:5007';


const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

api.interceptors.response.use((config) => {
    return config;
}, async (err) => {
    const originalRequest = err.config;
    if(err.response.status == 401) {
        try {
            const response = await axios.get(`http://localhost:5007/auth/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            return api.request(originalRequest);
        } catch (error) {
            console.log('Not Authorized');
        }
    };
    return Promise.reject(err);
})

export default api;