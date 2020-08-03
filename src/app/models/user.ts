class User {
    id: string;
    username: string;
    name: string;
    surname: string;
    email: string;
    banned: boolean;

    constructor(
        id?: string,
        username?: string,
        name?: string,
        surname?: string,
        email?: string,
        banned?: boolean) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.banned = banned;
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