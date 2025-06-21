import jwt from 'jsonwebtoken';
import TokenModel from '../models/token-model.js';
import UserDto from '../Dtos/UserDto.js';

class TokenService {

    generateToken = (payload) => {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken,
        };
    };

    saveToken = async (id, refreshToken) => {
        const tokenData = await TokenModel.findById(id);
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        };

        const token = await TokenModel.create({
            user: id,
            refreshToken,
        });

        return token;
    };

    sendToken = async (userData) => {
        const userDto = new UserDto(userData);
        const tokens = this.generateToken({ ...userDto });
        await this.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    };

    validateAccessToken = (accessToken) => {
        try {
            const token = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
            return token
        } catch (error) {
            return null
        };
    };

    validateRefreshToken = (refreshToken) => {
        try {
            const token = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            return token
        } catch (error) {
            return null
        };
    };


    removeToken = async (refreshToken) => {
        const token = await TokenModel.deleteOne({refreshToken});
        return token;
    };

    findToken = async (userId) => {
        const token = await TokenModel.findOne({ user: userId });
        return token;
    };

};

export default new TokenService();