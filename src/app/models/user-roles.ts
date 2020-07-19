
import { User } from './user';
import { Role } from './enums/role-type';
export class UserWithRoles extends User {
    authorities: string[];
    constructor(username: string, name: string, surname: string, email: string, authorities: string[]) {
        super(username, name, surname, email);
        this.authorities = authorities;
    }

}