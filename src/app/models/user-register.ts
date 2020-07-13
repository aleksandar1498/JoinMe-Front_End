export class UserRegister {
    username: string;
    name: string;
    surname: string;
    password: string;
    confirmPassword: string;
    email: string;
    isOrganizer: boolean;
    constructor(
        username: string,
        name: string,
        surname: string,
        password: string,
        confirmPassword: string,
        email: string,
        isOrganizer: boolean) {
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.email = email;
        this.isOrganizer = isOrganizer;
    }
}