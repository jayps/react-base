import {getTokenFromStorage} from '../utils';

export const getPermissions = async () => {
    const accessToken = getTokenFromStorage();
    const httpResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/permissions/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    });
    const response = await httpResponse.json();
    if (httpResponse.status !== 200) {
        if (response.data.detail) {
            throw new Error(response.data.detail);
        } else {
            throw new Error('An error occurred. Please try again.');
        }
    } else {
        return response.data;
    }
}