import {getTokenFromStorage} from '../utils';
import {Permission} from '../models/permission';
import {User} from '../models/user';

export const getGroups = async () => {
    const accessToken = getTokenFromStorage();

    const httpResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/groups/`, {
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

export const saveGroup = async (name: string, userSet: string[], permissions: number[], id?: string) => {
    const accessToken = getTokenFromStorage();
    const url: string = id ? `${process.env.REACT_APP_API_BASE_URL}/users/groups/${id}/` : `${process.env.REACT_APP_API_BASE_URL}/users/groups/`
    const method = id ? 'PUT' : 'POST';

    const httpResponse = await fetch(url, {
        method,
        body: JSON.stringify({
            name,
            permissions,
            userSet
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    });
    const response = await httpResponse.json();
    if (httpResponse.status !== 200 && httpResponse.status !== 201) {
        if (httpResponse.status === 403) {
            throw new Error('You do not have permission to manage groups.')
        } else if (response.data.detail) {
            throw new Error(response.data.detail);
        } else {
            throw new Error('An error occurred. Please try again.')
        }
    }
}

export const fetchGroupById = async (id: string) => {
    const accessToken = getTokenFromStorage();
    const httpResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/groups/${id}/`, {
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