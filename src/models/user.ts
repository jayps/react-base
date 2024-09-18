import {Group} from './group';

export class User {
    public id: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public isStaff: boolean;
    public isSuperuser: boolean;
    public groups: Group[];

    public constructor(
        id: string,
        email: string,
        firstName: string,
        lastName: string,
        isStaff: boolean,
        isSuperuser: boolean,
        groups: Group[],
    ) {
        // name cannot be changed after this initial definition, which has to be either at it's declaration or in the constructor.
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isStaff = isStaff;
        this.isSuperuser = isSuperuser;
        this.groups = groups;
    }

    public hasPermission(permission: string): boolean {
        console.log('Checking permissions for ', permission, this.groups);
        const found = this.groups.find((g) => {
            return g.permissions.find((p) => p.codename === permission) !== undefined
        });

        return found !== undefined;
    }
}