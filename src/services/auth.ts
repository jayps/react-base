export const login = async (email: string, password: string) => {
    const httpResponse = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login/`,
        {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    const response = await httpResponse.json();
    if (httpResponse.status !== 200) {
        if (httpResponse.status === 401) {
            throw new Error('Incorrect e-mail address or password.');
        } else if (response.data && response.data.detail) {
            throw new Error(response.data.detail);
        } else {
            throw new Error('An error occurred. Please try again.');
        }
    } else {
        return response.data;
    }
};
