import React from 'react';
import {Group} from '../../../models/group';
import {SubmitHandler, useForm} from 'react-hook-form';
import Alert from '../../alert';
import Button from '../../button';
import {Link} from 'react-router-dom';
import {useAuth} from '../../../context/auth/auth-context';
import {Permission} from '../../../models/permission';
import {User} from '../../../models/user';

export interface GroupFormProps {
    initialGroup?: Group;
}

interface GroupInputs {
    name: string;
}

const GroupForm: React.FC<GroupFormProps> = ({initialGroup}) => {
    const [error, setError] = React.useState<string | undefined>();
    const [success, setSuccess] = React.useState(false);
    const [saving, setSaving] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [permissions, setPermissions] = React.useState<Permission[]>([]);
    const [users, setUsers] = React.useState<User[]>([]);
    const authState = useAuth();

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
        setLoading(true);
        (async () => {
            await loadPermissions();
            await loadAllUsers();
        })();
        setLoading(false);
    }, []);

    React.useEffect(() => {
        console.log(users);
    }, [users]);

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isValid},
    } = useForm<GroupInputs>();

    const onSubmit: SubmitHandler<GroupInputs> = async (data) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" {...register("name", {required: true})} />
                    {
                        errors.name && <span>This field is required</span>
                    }
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <h4>Permissions</h4>
                        <div className="flex flex-col h-48 overflow-y-scroll border p-2 mb-1">
                            {
                                permissions.map((permission: Permission) => (
                                    <div key={`permission-${permission.id}`}>
                                        <input type="checkbox" /> <label>{permission.name}</label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <h4>Users</h4>
                        <div className="flex flex-col h-48 overflow-y-scroll border p-2 mb-1">
                            {
                                users.map((user: User) => (
                                    <div key={`user-${user.id}`}>
                                        <input type="checkbox"/> <label>{user.firstName} {user.lastName} ({user.email})</label>
                                    </div>
                                ))
                            }
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