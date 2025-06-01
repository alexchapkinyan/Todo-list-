import axios from "axios";

const BASE_URL = 'http://localhost:5004/tasks';

export const fetchTasks = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data
    } catch (error) {
        console.error(error);
        throw error;
    };
};

export const postNewTask = async (data) => {
    try {
        await axios.post(BASE_URL, data, {
            headers: {
                'content-type': 'application/json'
            }
        });
    } catch (error) {
        console.error(error);
        throw error;
    };
};


export const deleteTask = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        console.error(error);
        throw error
    };
};

export const patchTask = async (id, data) => {
    try {
        await axios.patch(`${BASE_URL}/${id}`, data, {
            headers: {
                'content-type': 'application/json'
            },
        });
    } catch (error) {
        console.error('Faile to update tasks on server:', error);
    };
};