export default class UserDto {
    email;
    id;

    constructor(data) {
        this.email = data.email;
        this.id = data._id
    };
};