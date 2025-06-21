import { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import api from '../../http';


const RequireAuth = ({ children }) => {

    const [isValidToken, setIsValidToken] = useState(null); 
    const location = useLocation();


    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if(!token) {
                setIsValidToken(false);
                return;
            };
            try {
                await api.get('/auth/validate-token');
                setIsValidToken(true);
            } catch (error) {
                setIsValidToken(false);
            };
        };
        checkAuth();
    }, []);

    if (isValidToken === null) return null;

    if(!isValidToken) {
        return <Navigate to="/auth/login" replace state={{ from: location}} />
    };

    return children
};

export default RequireAuth;