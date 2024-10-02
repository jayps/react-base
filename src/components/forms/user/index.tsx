import React, {ChangeEventHandler} from 'react';
import {Group} from '../../../models/group';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import Alert from '../../alert';
import Button from '../../button';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {AUTH_ACTION_TYPE, useAuth} from '../../../context/auth/auth-context';
import {Permission} from '../../../models/permission';
import {User} from '../../../models/user';

export interface UserInputs {
    email: string;
    firstName: string;
    lastName: string;
    isStaff: boolean;
    isSuperuser: boolean;
    isActive: boolean;
}

export interface UserFormProps {
    initialUser?: UserInputs;
}

const UserForm: React.FC<UserFormProps> = ({initialUser}) => {
    const [error, setError] = React.useState<string | undefined>();
    const [success, setSuccess] = React.useState(false);
    const [saving, setSaving] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const authState = useAuth();
    const navigate = useNavigate();
    const {id} = useParams();

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isValid},
        reset,
        control
    } = useForm<UserInputs>({
        defaultValues: initialUser
    });

    const onSubmit: SubmitHandler<UserInputs> = async (data) => {
        setSaving(true);

        try {
            const url: string = id ? `${process.env.REACT_APP_API_BASE_URL}/users/${id}/` : `${process.env.REACT_APP_API_BASE_URL}/users/`
            const method = id ? 'PUT' : 'POST';

            const httpResponse = await fetch(url, {
                method,
                body: JSON.stringify({...data}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState.accessToken}`,
                }
            });
            const response = await httpResponse.json();
            if (httpResponse.status !== 200 && httpResponse.status !== 201) {
                if (httpResponse.status === 403) {
                    setError('You do not have permission to manage users.')
                } else if (response.data.detail) {
                    setError(response.data.detail);
                } else {
                    setError('An error occurred. Please try again.')
                }
            } else {
                navigate('/users');
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
        }

        setSaving(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="name">E-mail Address</label>
                <Controller
                    name="email"
                    control={control}
                    defaultValue={initialUser?.email}
                    render={({field: {onChange, onBlur, value}}) => (
                        <input
                            type="email"
                            placeholder="E-mail Address"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                        />
                    )}
                    rules={{required: true}}
                />
            </div>
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <Controller
                    name="firstName"
                    control={control}
                    defaultValue={initialUser?.firstName}
                    render={({field: {onChange, onBlur, value}}) => (
                        <input
                            type="text"
                            placeholder="First Name"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                        />
                    )}
                    rules={{required: true}}
                />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Controller
                    name="lastName"
                    control={control}
                    defaultValue={initialUser?.lastName}
                    render={({field: {onChange, onBlur, value}}) => (
                        <input
                            type="text"
                            placeholder="Last Name"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                        />
                    )}
                    rules={{required: true}}
                />
            </div>
            <div className="form-group">
                <Controller
                    name="isActive"
                    control={control}
                    defaultValue={initialUser?.isActive}
                    render={({field: {onChange, onBlur, value}}) => (
                        <input
                            type="checkbox"
                            placeholder="Is Active"
                            onBlur={onBlur}
                            onChange={onChange}
                            checked={value}
                        />
                    )}
                />
                <label htmlFor="isActive" className="ms-2">Is Active</label>
            </div>
            <div className="form-group">
                <Controller
                    name="isStaff"
                    control={control}
                    defaultValue={initialUser?.isStaff}
                    render={({field: {onChange, onBlur, value}}) => (
                        <input
                            type="checkbox"
                            placeholder="Is Staff"
                            onBlur={onBlur}
                            onChange={onChange}
                            checked={value}
                        />
                    )}
                />
                <label htmlFor="isStaff" className="ms-2">Is Staff</label>
            </div>
            <div className="form-group">
                <Controller
                    name="isSuperuser"
                    control={control}
                    defaultValue={initialUser?.isSuperuser}
                    render={({field: {onChange, onBlur, value}}) => (
                        <input
                            type="checkbox"
                            placeholder="Is Superuser"
                            onBlur={onBlur}
                            onChange={onChange}
                            checked={value}
                        />
                    )}
                />
                <label htmlFor="isSuperuser" className="ms-2">Is Superuser</label>

            </div>
            <Alert severity="error" message={error}/>
            <div className="text-end flex justify-end">
                <div>
                    <Button text="Submit" type="submit" color="primary" className="my-5" disabled={!isValid}
                            busy={saving}/>
                </div>
            </div>
        </form>
    )
}

export default UserForm;