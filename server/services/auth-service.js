import UserModel from "../models/user-model.js";
import bcrypt from 'bcrypt';
import TokenService from "./token-service.js";
import ApiError from "../utils/ApiError.js";
import UserDto from "../Dtos/UserDto.js";
import TodoModel from "../models/todo-model.js";

class AuthService {

    register = async (email, password) => {
        const user = await UserModel.findOne({ email });
        if(user) {
            throw new ApiError(400,'User with this email exists!');
        };

        const hashedPass = await bcrypt.hash(password, Number(process.env.SALT));

        const newUser = await UserModel.create({
            email,
            password: hashedPass,
        });

        const userData = await TokenService.sendToken(newUser);

        return userData;
    };

    deleteAccount = async (id) => {
        const user = await UserModel.findByIdAndDelete(id);
        const token = await TokenService.findToken(id);
        const todos = await TodoModel.deleteMany({ user: id });
        return { user, token}
    };

    login = async (email, password) => {
        const user = await UserModel.findOne({ email });
        if(!user) {
            throw new ApiError(404,"User not found!");
        };
        const isPassCorrect = await bcrypt.compare(password, user.password);
        if(!isPassCorrect) {
            throw new ApiError(401, 'Invalid password!');
        };

        const userData = await TokenService.sendToken(user);

        return userData;
    };

    logout = async (refreshToken) => {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    };

    refresh = async (refreshToken) => {
        const userData = TokenService.validateRefreshToken(refreshToken);
        const user = await UserModel.findById(userData.id)
        const tokens = await TokenService.sendToken(user);
        return {
            ...user,
            ...tokens,
        }
    };

    me = async (id) => {
        const userData = await UserModel.findById(id);
        if(!userData) {
            throw new ApiError(400, 'Bad request');
        };
        const userDto = new UserDto(userData);
        return userDto;
    };
};

export default new AuthService();