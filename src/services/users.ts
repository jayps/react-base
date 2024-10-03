import {getTokenFromStorage} from '../utils';

export const getUsers = async () => {
    const accessToken = getTokenFromStorage();
    const httpResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/all/`, {
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

export const saveUser = async (
    email: string,
    firstName: string,
    lastName: string,
    isStaff: boolean,
    isSuperuser: boolean,
    isActive: boolean,
    id?: string
) => {
    const accessToken = getTokenFromStorage();
    const url: string = id ? `${process.env.REACT_APP_API_BASE_URL}/users/${id}/` : `${process.env.REACT_APP_API_BASE_URL}/users/`
    const method = id ? 'PUT' : 'POST';

    const httpResponse = await fetch(url, {
        method,
        body: JSON.stringify({
            email,
            firstName,
            lastName,
            isStaff,
            isSuperuser,
            isActive
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    });
    const response = await httpResponse.json();
    if (httpResponse.status !== 200 && httpResponse.status !== 201) {
        if (httpResponse.status === 403) {
            throw new Error('You do not have permission to manage users.')
        } else if (response.data.detail) {
            throw new Error(response.data.detail);
        } else {
            throw new Error('An error occurred. Please try again.')
        }
    }
}