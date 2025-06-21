import TodoModel from "../models/todo-model.js";

class TodoController {

    addTodo = async (req, res, next) => {
        try {
            const { task } = req.body;
            const id = req.user.id
            const todo = await TodoModel.create({task, user: id,});
            return res.json(todo);
        } catch (error) {
            next(error);
        };
    };

    getTodos = async (req, res, next) => {
        try {
            const userId = req.user.id
            const todos = await TodoModel.find({ user: userId });
            res.json(todos)
        } catch (error) {
            next(error);
        };
    };

    updateTodo = async (req, res, next) => {
        try {
            const { completed } = req.body;
            const { id } = req.params;
            const upatedTodo = await TodoModel.findByIdAndUpdate(id, { completed }, { new: true });
            return res.json(upatedTodo);
        } catch (error) {
            next(error);
        };
    };

    deleteTodo = async (req, res, next) => {
        try {
            const { id } = req.params;
            const updatedTodo = await TodoModel.findByIdAndDelete(id);
            return res.json(updatedTodo);
        } catch (error) {
            next(error);
        };
    };

    editTodo = async (req, res, next) => {
        try {
            const { task } = req.body;
            const { id } = req.params;
            const upatedTodo = await TodoModel.findByIdAndUpdate(id, { task }, { new: true });
            return res.json(upatedTodo);
        } catch (error) {
            next(error);
        };
    };


};

export default new TodoController();