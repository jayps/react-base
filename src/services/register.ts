export const registerUser = async (firstName: string, lastName: string, email: string, password: string, repeatPassword: string) => {
    const httpResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/register/`, {
        method: 'POST',
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            repeatPassword
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const response = await httpResponse.json();
    if (httpResponse.status !== 201) {
        if (response.data) {
            throw new Error(response.data);
        } else {
            throw new Error('An error occurred during registration. Please try again.')
        }
    } else {
        return true;
    }
}