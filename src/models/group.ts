import { Permission } from './permission';
import { User } from './user';

export interface Group {
    id: number;
    name: string;
    permissions: Permission[];
    userSet?: User[];
}
