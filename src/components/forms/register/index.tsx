import React from 'react';
import Button from '../../button';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import {Simulate} from 'react-dom/test-utils';
import Alert from '../../alert';

type RegisterFormInputs = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
}

const RegisterForm: React.FC = () => {
    const [isRegistering, setIsRegistering] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isValid},
        setError,
        clearErrors
    } = useForm<RegisterFormInputs>();

    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        setIsRegistering(true);
        setErrorMessage(undefined);
        try {
            const httpResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/register/`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const response = await httpResponse.json();
            console.log(response);
            if (httpResponse.status !== 201) {
                if (response.data) {
                    setErrorMessage(response.data);
                } else {
                    setErrorMessage('An error occurred during registration. Please try again.')
                }
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('An error occurred during registration. Please try again.')
        }

        setIsRegistering(false);
    }

    return (
        <>
            <div className="login-form bg-white p-5 min-w-96 min-h-96 flex flex-col justify-center items-center">
                <div className="min-w-96">
                    <h2>Register</h2>
                </div>
                <div className="flex flex-col w-full">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" {...register("firstName", {required: true})} />
                            {
                                errors.firstName && <span>This field is required</span>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">First Name</label>
                            <input type="text" {...register("lastName", {required: true})} />
                            {
                                errors.lastName && <span>This field is required</span>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" {...register("email", {required: true})} />
                            {
                                errors.email && <span>This field is required</span>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" {...register("password", {required: true})} />
                            {
                                errors.password && <span>This field is required</span>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="repeatPassword">Repeat Password</label>
                            <input type="password" {...register("repeatPassword", {
                                required: true,
                                validate: (val: string) => {
                                    if (watch('password') !== val) {
                                        setError('repeatPassword', {type: 'custom', message: 'Passwords do not match.'})
                                        return false;
                                    } else {
                                        clearErrors('repeatPassword');
                                        return true;
                                    }
                                }
                            })} />
                            {
                                errors.repeatPassword &&
                                <span>{errors.repeatPassword.message || 'This field is required'}</span>
                            }
                        </div>
                        {
                            errorMessage && (
                                <Alert severity="error">{errorMessage}</Alert>
                            )
                        }
                        <div className="text-end flex flex-col justify-end">
                            <Button text="Register" type="submit" color="primary" className="my-5" disabled={!isValid}
                                    busy={isRegistering}/>
                            <Link to="/login">Already have an account? Login here.</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterForm;