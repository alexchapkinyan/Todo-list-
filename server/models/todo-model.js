import { Schema, model } from 'mongoose';

const TodoModel = new Schema({
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, required: true }
});

export default model('Todo', TodoModel);