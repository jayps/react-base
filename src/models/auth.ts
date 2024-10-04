import { Group } from './group';

export interface Auth {
    refresh: string;
    access: string;
}

export interface JwtInfo {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
    is_superuser: boolean;
    is_active: boolean;
    groups: Group[];
}
