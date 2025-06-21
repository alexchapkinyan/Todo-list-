import { Schema, model } from 'mongoose';

const TokenModel = new Schema({
    refreshToken: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true }
});

export default model('Token', TokenModel);