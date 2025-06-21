import AuthService from "../services/auth-service.js";
import { validationResult } from "express-validator";

class AuthController {

    register = async (req, res, next) => {
        try {
            const error = validationResult(req);
            if(!error.isEmpty()) {
                return res.status(400).json({ errors: error.array() });
            }
            const { email, password } = req.body;
            const userData = await AuthService.register(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                httpOnly: true,
                sameSite: 'None',     
                secure: true,        
                maxAge: 30 * 24 * 60 * 60 * 1000 
            });
            return res.status(201).json(userData);
        } catch (error) {
            next(error);
        };
    };

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const userData = await AuthService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                httpOnly: true,
                sameSite: 'None',     
                secure: true,        
                maxAge: 30 * 24 * 60 * 60 * 1000 
            });
            return  res.status(200).json(userData)
        } catch (error) {
            return res.status(error.status).json({ message: error.message });
        };
    };

    logout = async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;
            await AuthService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            next(error);
        };
    };

    deleteAccount = async (req, res, next) => {
        try {
            const { id } = req.params;
            if(req.user.id !== id) {
                return res.status(403).json({ message: "You can't delete another user" });
            };
            await AuthService.deleteAccount(id);
            res.clearCookie('refreshToken');
            return res.json({ message: 'Account deleted successfully' });
        } catch (error) {
            next(error);
        };
    };

    refresh = async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;
            const userData = await AuthService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {
                httpOnly: true,
                sameSite: 'None',     
                secure: true,        
                maxAge: 30 * 24 * 60 * 60 * 1000 
            });
            return res.json(userData);
        } catch (error) {
            next(error);
        };
    };

    validateToken = (req, res, next) => {
        res.json({ valid: true });
    };

    me = async (req, res, next) => {
        try {
            const userData = await AuthService.me(req.user.id);
            return res.json(userData);
        } catch (error) {
            next(error);
        };
    };
};

export default new AuthController();