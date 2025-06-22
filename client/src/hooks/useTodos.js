import { toast } from "sonner";
import errorParser from "../utils/errorParser";
import api from "../http";

const useTodo = () => {

    const addTodo = async (body) => {
        try {
            await api.post('/todos', body);
        } catch (error) {
            const errorMessage = errorParser(error);
            toast.error(errorMessage);
            throw error;
        };
    };

    const getTodos = async () => {
        try {
            const response = await api.get('todos');
            return response;
        } catch (error) {
            const errorMessage = errorParser(error);
            toast.error(errorMessage);
            throw error;
        };
    };

    const updateTodo = async (id, body) => {
        try {
            const response = await api.patch(`/todos/update/${id}`, body);
            return response;
        } catch (error) {
            const errorMessage = errorParser(error);
            toast.error(errorMessage);
            throw error;
        };
    };

     const editTodo = async (id, body) => {
        try {
            const response = await api.patch(`/todos/edit/${id}`, body);
            return response;
        } catch (error) {
            const errorMessage = errorParser(error);
            toast.error(errorMessage);
            throw error;
        };
    };

    const deleteTodo = async (id) => {
        try {
            const response = await api.delete(`/todos/${id}`);
            return response;
        } catch (error) {
            const errorMessage = errorParser(error);
            toast.error(errorMessage);
            throw error;
        };
    }; 

    return {
        addTodo,
        getTodos,
        updateTodo,
        deleteTodo,
        editTodo,
    };
};

export default useTodo;