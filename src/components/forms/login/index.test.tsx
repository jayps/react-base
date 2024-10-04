import React from 'react';
import LoginForm from './index';
import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import * as AuthService from './../../../services/auth';
import * as AuthContext from '../../../context/auth/auth-context';
import { AUTH_ACTION_TYPE } from '../../../context/auth/auth-context';

describe('Login form', () => {
    it('Should render successfully', () => {
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
    });

    it('Should call auth dispatch when form is filled properly', async () => {
        const loginResponse = {
            access: 'accessToken',
            refresh: 'refreshToken',
        };

        const mockLogin = jest.spyOn(AuthService, 'login');
        mockLogin.mockResolvedValue(loginResponse);

        const mockAuthDispatch = jest.fn();
        const mockUseAuthDispatch = jest.spyOn(AuthContext, 'useAuthDispatch');
        mockUseAuthDispatch.mockReturnValue(mockAuthDispatch);

        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );

        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const loginButton = screen.getByTestId('login-button');

        await act(async () => {
            userEvent.click(emailInput);
            userEvent.keyboard('test@test.com');
            fireEvent.blur(emailInput);

            userEvent.click(passwordInput);
            userEvent.keyboard('Pass123#');
            fireEvent.blur(passwordInput);

            userEvent.click(loginButton);
        });

        await waitFor(() =>
            expect(
                expect(mockLogin).toHaveBeenCalledWith(
                    'test@test.com',
                    'Pass123#'
                )
            )
        );
        expect(mockAuthDispatch).toHaveBeenCalledWith({
            type: AUTH_ACTION_TYPE.SET_TOKEN,
            payload: loginResponse,
        });
    });

    it('Should show an error message for incorrect credentials', async () => {
        const mockLogin = jest.spyOn(AuthService, 'login');
        mockLogin.mockRejectedValue(new Error('Incorrect credentials'));

        const mockAuthDispatch = jest.fn();
        const mockUseAuthDispatch = jest.spyOn(AuthContext, 'useAuthDispatch');
        mockUseAuthDispatch.mockReturnValue(mockAuthDispatch);

        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );

        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const loginButton = screen.getByTestId('login-button');

        await act(async () => {
            userEvent.click(emailInput);
            userEvent.keyboard('test@test.com');
            fireEvent.blur(emailInput);

            userEvent.click(passwordInput);
            userEvent.keyboard('Pass123#');
            fireEvent.blur(passwordInput);

            userEvent.click(loginButton);
        });

        await waitFor(() =>
            expect(
                expect(mockLogin).toHaveBeenCalledWith(
                    'test@test.com',
                    'Pass123#'
                )
            )
        );
        expect(mockAuthDispatch).not.toHaveBeenCalled();
    });
});
