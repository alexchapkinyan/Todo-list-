const errorParser = (error) => {
    if(error.response) {
        const data = error.response.data

        if(typeof data === 'string') return data;

        if(data.message) return data.message;

        if(Array.isArray(data.errors)) {
            return data.errors.map(err => err.msg || err.message).join(', ')
        };
    };
};

export default errorParser;