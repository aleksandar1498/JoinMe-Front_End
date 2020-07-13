export class UserAuth {
    username: string;
    token: string;
    constructor(username: string, token: string) {
        this.token = token;
        this.username = username;
    }
}