import { useNavigate } from "react-router-dom";
import api from "../http";
import errorParser from "../utils/errorParser";
import { toast } from "sonner";

const useAuth = () => {

    const navigate = useNavigate();


    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', {
                email,
                password,
            });
            if(response.status === 200) {
                localStorage.setItem('token', response.data.accessToken);
                toast.success('Login successful!');
            };
        } catch (error) {
            const errorMessage = errorParser(error);
            toast.error(errorMessage);
        };
    };

    const register = async (email, password) => {
        try {
            const response = await api.post('/auth/register', {
                email,
                password,
            });
            if(response.status === 201) {
                localStorage.setItem('token', response.data.accessToken);
                toast.success('Welcome! Your account has been created!');
            };
        } catch (error) {
            const errorMessage = errorParser(error);
            toast.error(errorMessage);
            throw error;
        };
    };

    const logout = async () => {
        try {
            const response = await api.post('/auth/logout');
            if (response.status === 200) {
                localStorage.removeItem('token');
                toast.success(response.data.message);
                navigate('/auth/login');
            };
            return response;
        } catch (error) {
            const errorMessage = errorParser(error);
            toast.error(errorMessage);
            throw error;
        };
    };

    const deleteAccount = async (id) => {
        try {
            const response = await api.delete(`auth/delete/${id}`);
            localStorage.removeItem('token');
            toast.success(response.data.message);
            navigate('/auth/login');
            return response;
        } catch (error) {
            const errorMessage = errorParser(error);
            toast.error(errorMessage);
            throw error;
        }
    };

    const me = async () => {
        try {
            const response = await api.get('/auth/me');
            return response;
        } catch (error) {
            navigate('/auth/login');
            const errorMessage = errorParser(error);
            toast.error(errorMessage);
            throw error;
        };
    };

    return {
        login,
        register,
        logout,
        me,
        deleteAccount,
    };

};

export default useAuth;