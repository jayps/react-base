import React from 'react';
import Button from '../../button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Alert from '../../alert';
import {
    AUTH_ACTION_TYPE,
    useAuth,
    useAuthDispatch,
} from '../../../context/auth/auth-context';
import logo from '../../../media/logo.svg';
import Card from '../../card';
import { login } from '../../../services/auth';
import Input from '../elements/input/Input';

type LoginFormInputs = {
    email: string;
    password: string;
};

const LoginForm: React.FC = () => {
    const [isLoggingIn, setIsLoggingIn] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<
        string | undefined
    >();
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<LoginFormInputs>();
    useAuth();

    const authDispatch = useAuthDispatch();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setIsLoggingIn(true);
        setErrorMessage(undefined);

        try {
            const response = await login(data.email, data.password);
            if (authDispatch) {
                authDispatch({
                    type: AUTH_ACTION_TYPE.SET_TOKEN,
                    payload: response,
                });
            }
            localStorage.setItem('token', JSON.stringify(response));
        } catch (err) {
            if (err instanceof Error) {
                setErrorMessage(err.message);
            } else {
                setErrorMessage('An error has occurred. Please try again.');
            }
        }

        setIsLoggingIn(false);
    };

    return (
        <Card>
            <div className="min-w-96 flex flex-row justify-between items-start">
                <h2>Login</h2>
                <img src={logo} alt="logo" className="mb-5 h-6" />
            </div>
            <div className="flex w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <Input
                        name="email"
                        label="E-mail"
                        type="email"
                        errors={errors}
                        control={control}
                        required={true}
                        testId="email-input"
                    />
                    <Input
                        name="password"
                        label="Password"
                        type="password"
                        errors={errors}
                        control={control}
                        required={true}
                        testId="password-input"
                    />
                    <Alert severity="error" message={errorMessage} />
                    <div className="text-end flex flex-col justify-end">
                        <Button
                            text="Login"
                            type="submit"
                            color="primary"
                            className="my-5"
                            busy={isLoggingIn}
                            testId="login-button"
                        />
                        <Link to="/register">New User? Register here.</Link>
                    </div>
                </form>
            </div>
        </Card>
    );
};

export default LoginForm;
