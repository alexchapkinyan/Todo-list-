const BASE_URL = 'http://localhost:5004/tasks';

export const fetchTasks = async () => {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
        throw error;
    };
};

export const postNewTask = async (data) => {
    try {
        await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error(error);
        throw error;
    };
};


export const deleteTask = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error(error);
        throw error
    };
};

export const patchTask = async (id, data) => {
    try {
        await fetch(`${BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error('Faile to update tasks on server:', error);
    };
};