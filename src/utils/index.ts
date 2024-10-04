import { User } from '../models/user';
import { JwtInfo } from '../models/auth';
import { jwtDecode } from 'jwt-decode';

export const getTokenFromStorage = (): string => {
    const tokenJson = localStorage.getItem('token');
    if (!tokenJson) {
        throw new Error('Unauthenticated');
    }

    const token = JSON.parse(tokenJson);
    return token.access as string;
};

export const getUserFromAccessToken = (token: string): User => {
    const userInfo: JwtInfo = jwtDecode(token);
    return new User(
        userInfo.user_id,
        userInfo.email,
        userInfo.first_name,
        userInfo.last_name,
        userInfo.is_staff,
        userInfo.is_superuser,
        userInfo.is_active,
        userInfo.groups
    );
};
