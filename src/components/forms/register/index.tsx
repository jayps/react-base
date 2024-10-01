import React from 'react';
import Button from '../../button';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import Alert from '../../alert';
import Card from '../../card';
import logo from '../../../media/logo.svg';
import {registerUser} from '../../../services/register';

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
    const [success, setSuccess] = React.useState(false);
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
        setSuccess(false);
        try {
            await registerUser(
                data.firstName,
                data.lastName,
                data.email,
                data.password,
                data.repeatPassword
            );
            setSuccess(true);
        } catch (err) {
            if (err instanceof Error) {
                setErrorMessage(err.message)
            } else {
                setErrorMessage('An error has occurred. Please try again.');
            }
        }

        setIsRegistering(false);
    }

    if (success) {
        return (
            <Alert severity="success" message="You have registered an account. You can now log in"/>
        )
    }

    return (
        <Card>
            <div className="min-w-96 flex flex-row justify-between items-start">
                <h2>Register</h2>
                <img src={logo} alt="logo" className="mb-5 h-6"/>
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
                            <Alert severity="error" message={errorMessage}/>
                        )
                    }
                    <div className="text-end flex flex-col justify-end">
                        <Button text="Register" type="submit" color="primary" className="my-5" disabled={!isValid}
                                busy={isRegistering}/>
                        <Link to="/login">Already have an account? Login here.</Link>
                    </div>
                </form>
            </div>
        </Card>
    )
}

export default RegisterForm;