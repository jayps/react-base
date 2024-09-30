import React from 'react';
import Button from '../../button';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import Alert from '../../alert';
import {AUTH_ACTION_TYPE, AuthProvider, useAuth, useAuthDispatch} from '../../../context/auth/auth-context';
import logo from '../../../media/logo.svg';

type LoginFormInputs = {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const [isLoggingIn, setIsLoggingIn] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
    const [, setSuccess] = React.useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm<LoginFormInputs>();
    useAuth();

    const authDispatch = useAuthDispatch();

    React.useEffect(() => {
        console.log(errors);
    }, [errors]);

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setIsLoggingIn(true);
        setErrorMessage(undefined);
        setSuccess(false);
        try {
            const httpResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login/`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const response = await httpResponse.json();
            if (httpResponse.status !== 200) {
                if (httpResponse.status === 401) {
                    setErrorMessage('Incorrect e-mail address or password.')
                } else if (response.data.detail) {
                    setErrorMessage(response.data.detail);
                } else {
                    setErrorMessage('An error occurred. Please try again.')
                }
            } else {
                setSuccess(true);
                // TODO: Properly type this
                // @ts-ignore
                authDispatch({
                    type: AUTH_ACTION_TYPE.SET_TOKEN,
                    payload: response.data
                });
                localStorage.setItem('token', JSON.stringify(response.data));
            }
        } catch (err) {
            setErrorMessage('An error occurred. Please try again.')
        }

        setIsLoggingIn(false);
    }

    return (
        <>
            <div className="login-form shadow-xl rounded bg-white p-5 min-w-96 min-h-96 flex flex-col justify-center items-center">
                <div className="min-w-96 flex flex-row justify-between items-start">
                    <h2>Login</h2>
                    <img src={logo} alt="logo" className="mb-5 h-6" />
                </div>
                <div className="flex w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" {...register("email", {required: true})} />
                            {
                                errors.email && <span className="input-error">This field is required</span>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" {...register("password", {required: true})} />
                            {
                                errors.password && <span className="input-error">This field is required</span>
                            }
                        </div>
                        {
                            errorMessage && (
                                <Alert severity="error">{errorMessage}</Alert>
                            )
                        }
                        <div className="text-end flex flex-col justify-end">
                            <Button text="Login" type="submit" color="primary" className="my-5"
                                    busy={isLoggingIn}/>
                            <Link to="/register">New User? Register here.</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginForm;