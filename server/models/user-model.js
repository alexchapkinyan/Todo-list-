import { Schema, model } from 'mongoose';

const UserModel = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export default model('User', UserModel);