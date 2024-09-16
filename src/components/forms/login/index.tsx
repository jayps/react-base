import React from 'react';
import Button from '../../button';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';

type LoginFormInputs = {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => console.log(data)

    return (
        <>
            <div className="login-form rounded bg-white p-5 min-w-96 min-h-96 flex flex-col justify-center items-center">
                <div className="min-w-96">
                    <h2>Login</h2>
                </div>
                <div className="flex w-full">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
                        <div className="text-end flex flex-col justify-end">
                            <Button text="Login" type="submit" color="primary" className="my-5"/>
                            <Link to="/register">New User? Register here.</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginForm;