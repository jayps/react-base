import { login } from './auth';

describe('Test authentication service', () => {
    it('should return invalid credential message when http 401 is returned', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 401,
                json: () =>
                    Promise.resolve({
                        data: {
                            detail: 'No active account found with the given credentials',
                        },
                        message: 'UNAUTHORIZED',
                        status: 401,
                    }),
            })
        ) as jest.Mock;
        await expect(() => login('test@test.com', 'Pass123#')).rejects.toThrow(
            'Incorrect e-mail address or password.'
        );
    });

    it('should return response data when available and invalid response is received', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 400,
                json: () =>
                    Promise.resolve({
                        data: {
                            detail: 'Test message',
                        },
                        message: 'BAD REQUEST',
                        status: 400,
                    }),
            })
        ) as jest.Mock;
        await expect(() => login('test@test.com', 'Pass123#')).rejects.toThrow(
            'Test message'
        );
    });

    it('should return default error', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 500,
                json: () =>
                    Promise.resolve({
                        data: null,
                        message: 'Internal Server Error',
                        status: 500,
                    }),
            })
        ) as jest.Mock;
        await expect(() => login('test@test.com', 'Pass123#')).rejects.toThrow(
            'An error occurred. Please try again.'
        );
    });

    it('should access and refresh token from API', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 200,
                json: () =>
                    Promise.resolve({
                        data: {
                            refresh: 'refreshToken',
                            access: 'accessToken',
                        },
                        message: 'OK',
                        status: 200,
                    }),
            })
        ) as jest.Mock;

        const response = await login('test@test.com', 'Pass123#');
        expect(response).toEqual({
            refresh: 'refreshToken',
            access: 'accessToken',
        });
    });
});
