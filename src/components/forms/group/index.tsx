import React from 'react';
import {Group} from '../../../models/group';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import Alert from '../../alert';
import Button from '../../button';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {AUTH_ACTION_TYPE, useAuth} from '../../../context/auth/auth-context';
import {Permission} from '../../../models/permission';
import {User} from '../../../models/user';

export interface GroupInputs {
    name: string;
    userSet: string[];
    permissions: string[];
}

export interface GroupFormProps {
    initialGroup?: GroupInputs;
}

const GroupForm: React.FC<GroupFormProps> = ({initialGroup}) => {
    const [error, setError] = React.useState<string | undefined>();
    const [success, setSuccess] = React.useState(false);
    const [saving, setSaving] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [permissions, setPermissions] = React.useState<Permission[]>([]);
    const [users, setUsers] = React.useState<User[]>([]);
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
    } = useForm<GroupInputs>({
        defaultValues: initialGroup
    });

    const loadPermissions = async () => {
        try {
            const httpResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/permissions/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState.accessToken}`,
                }
            });
            const response = await httpResponse.json();
            if (httpResponse.status !== 200) {
                if (response.data.detail) {
                    setError(response.data.detail);
                } else {
                    setError('An error occurred. Please try again.');
                }
            } else {
                setPermissions(response.data.map((permission: Permission) => ({name: permission.name, id: permission.id, codename: permission.codename})));
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
        }
    }

    const loadAllUsers = async () => {
        try {
            const httpResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/all/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState.accessToken}`,
                }
            });
            const response = await httpResponse.json();
            if (httpResponse.status !== 200) {
                if (response.data.detail) {
                    setError(response.data.detail);
                } else {
                    setError('An error occurred. Please try again.');
                }
            } else {
                setUsers(response.data);
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
        }
    }

    React.useEffect(() => {
        console.log('initialGroup', initialGroup);
        setLoading(true);
        (async () => {
            await loadPermissions();
            await loadAllUsers();
        })();
        setLoading(false);
    }, []);

    const onSubmit: SubmitHandler<GroupInputs> = async (data) => {
        setSaving(true);

        try {
            const url: string = id ? `${process.env.REACT_APP_API_BASE_URL}/users/groups/${id}/` : `${process.env.REACT_APP_API_BASE_URL}/users/groups/`
            const method = id ? 'PUT' : 'POST';

            const httpResponse = await fetch(url, {
                method,
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState.accessToken}`,
                }
            });
            const response = await httpResponse.json();
            if (httpResponse.status !== 200 && httpResponse.status !== 201) {
                if (httpResponse.status === 403) {
                    setError('You do not have permission to manage groups.')
                } else if (response.data.detail) {
                    setError(response.data.detail);
                } else {
                    setError('An error occurred. Please try again.')
                }
            } else {
                navigate('/groups');
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
        }

        setSaving(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue={initialGroup?.name}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <input
                                type="text"
                                placeholder="First name"
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                            />
                        )}
                        rules={{required: true}}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <h4>Permissions</h4>
                        <div className="flex flex-col h-48 overflow-y-scroll border p-2 mb-1">
                            <Controller
                                name="permissions"
                                control={control}
                                defaultValue={initialGroup?.permissions}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <select
                                        value={value}
                                        onChange={onChange}
                                        multiple={true}
                                        className="h-full"
                                    >
                                        {
                                            permissions.map((permission: Permission) => (
                                                <option key={`permission-${permission.id}`} value={permission.id}>
                                                    {permission.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                )}
                                rules={{required: true}}
                            />
                        </div>
                    </div>
                    <div>
                        <h4>Users</h4>
                        <div className="flex flex-col h-48 overflow-y-scroll border p-2 mb-1">
                            <Controller
                                name="userSet"
                                control={control}
                                defaultValue={initialGroup?.userSet}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <select
                                        value={value}
                                        onChange={onChange}
                                        multiple={true}
                                        className="h-full"
                                    >
                                        {
                                            users.map((user: User) => (
                                                <option key={`user-${user.id}`} value={user.id}>
                                                    {user.firstName} {user.lastName} ({user.email})
                                                </option>
                                            ))
                                        }
                                    </select>
                                )}
                                rules={{required: true}}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {
                error && (
                    <Alert severity="error">{error}</Alert>
                )
            }
            <div className="text-end flex justify-end">
                <div>
                    <Button text="Submit" type="submit" color="primary" className="my-5" disabled={!isValid}
                            busy={saving}/>
                </div>
            </div>
        </form>
    )
}

export default GroupForm;