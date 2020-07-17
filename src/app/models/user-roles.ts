
import { User } from './user';
import { Role } from './enums/role-type';
export class UserWithRoles extends User {
    roles: string[];
    constructor(username: string, name: string, surname: string, email: string, roles: string[]) {
        super(username, name, surname, email);
        this.roles = roles;
    }

}