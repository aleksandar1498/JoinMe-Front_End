class User {
    username: string;
    name: string;
    surname: string;
    email: string;

    constructor(
        username?: string,
        name?: string,
        surname?: string,
        email?: string) {
            this.username = username;
            this.name = name;
            this.surname = surname;
            this.email = email;
    }

}

class UserLogin {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.password = password;
        this.username = username;
    }
}
export { User, UserLogin };