export const getTokenFromStorage = (): string => {
    const tokenJson = localStorage.getItem('token');
    if (!tokenJson) {
        throw new Error('Unauthenticated');
    }

    const token = JSON.parse(tokenJson);
    return token.access as string;
};
