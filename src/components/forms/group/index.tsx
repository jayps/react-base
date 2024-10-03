import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import Alert from '../../alert';
import Button from '../../button';
import {useNavigate, useParams} from 'react-router-dom';
import {useAuth} from '../../../context/auth/auth-context';
import {Permission} from '../../../models/permission';
import {User} from '../../../models/user';
import {getPermissions} from '../../../services/permissions';
import {getUsers} from '../../../services/users';
import SimpleContentLoader from '../../loader/content-loader';
import {saveGroup} from '../../../services/groups';
import Input from '../elements/input/Input';

export interface GroupInputs {
    name: string;
    userSet: string[];
    permissions: number[];
}

export interface GroupFormProps {
    initialGroup?: GroupInputs;
}

const GroupForm: React.FC<GroupFormProps> = ({initialGroup}) => {
    const [error, setError] = React.useState<string | undefined>();
    const [saving, setSaving] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [permissions, setPermissions] = React.useState<Permission[]>([]);
    const [selectedPermissions, setSelectedPermissions] = React.useState<Permission[]>([]);
    const [users, setUsers] = React.useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);
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
            const fetchedPermissions = await getPermissions();
            setPermissions(fetchedPermissions.map((permission: Permission) => ({
                name: permission.name,
                id: permission.id,
                codename: permission.codename
            })));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('An error has occurred. Please try again.');
            }
        }
    }

    const loadAllUsers = async () => {
        try {
            const fetchedUsers = await getUsers();
            setUsers(fetchedUsers);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('An error has occurred. Please try again.');
            }
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

    const onSubmit: SubmitHandler<GroupInputs> = async (data) => {
        setSaving(true);

        try {
            await saveGroup(
                data.name,
                selectedUsers.map((u: User) => u.id),
                selectedPermissions.map((p: Permission) => p.id),
                id
            );
            navigate('/groups');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('An error has occurred. Please try again.');
            }
        } finally {
            setSaving(false);
        }
    }

    React.useEffect(() => {
        if (initialGroup) {
            setSelectedPermissions(permissions.filter((p: Permission) => initialGroup.permissions.findIndex((initialPermission) => initialPermission === p.id) > -1))
        }
    }, [initialGroup, initialGroup?.permissions, permissions]);

    React.useEffect(() => {
        if (initialGroup) {
            setSelectedUsers(users.filter((u: User) => initialGroup.userSet.findIndex((initialUser) => initialUser === u.id) > -1))
        }
    }, [initialGroup, users]);

    const selectPermission = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const foundPermission: Permission | undefined = permissions.find((p: Permission) => p.id === parseInt(e.target.value));
        if (foundPermission) {
            setSelectedPermissions([...selectedPermissions, foundPermission]);
        }
    }
    const selectUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const foundUser: User | undefined = users.find((u: User) => u.id === e.target.value);
        if (foundUser) {
            setSelectedUsers([...selectedUsers, foundUser]);
        }
    }

    const removeSelectedPermission = (permission: Permission) => {
        setSelectedPermissions(selectedPermissions.filter((p: Permission) => p.id !== permission.id));
    }

    const removeSelectedUser = (user: User) => {
        setSelectedUsers(selectedUsers.filter((u: User) => u.id !== user.id));
    }

    return (
        <SimpleContentLoader loading={loading}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input name="name" errors={errors} register={register} required={true}/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                            <h4>Permissions</h4>
                            <div className="flex flex-col min-h-48 overflow-y-scroll border p-2 mb-1">
                                <div className="form-group">
                                    <select onChange={selectPermission} id="permissions-selector"
                                            className="form-select">
                                        <option>Select permission to add</option>
                                        {
                                            permissions.filter((p: Permission) => selectedPermissions.findIndex((selectedPermission) => selectedPermission.id === p.id) === -1).map((p: Permission) => (
                                                <option key={p.id} value={p.id}>{p.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <h4>Selected Permissions</h4>
                                {
                                    selectedPermissions.map((p: Permission) => (
                                        <span key={`permission-${p.codename}`}
                                              className="border border-gray-300 block w-full py-1 px-2 rounded mb-2 flex justify-between">
                                        <span>
                                            {p.name}
                                        </span>
                                        <span onClick={() => removeSelectedPermission(p)}
                                              className="hover:cursor-pointer border border-gray-200 hover:bg-gray-300 bg-gray-200 px-1 roounded">
                                            &times;
                                        </span>
                                    </span>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            <h4>Users</h4>
                            <div className="flex flex-col min-h-48 overflow-y-scroll border p-2 mb-1">
                                <div className="form-group">
                                    <select onChange={selectUser} id="permissions-selector" className="form-select">
                                        <option>Select user to add</option>
                                        {
                                            users.filter((u: User) => selectedUsers.findIndex((selectedUser) => selectedUser.id === u.id) === -1).map((u: User) => (
                                                <option key={u.id}
                                                        value={u.id}>{u.firstName} {u.lastName} ({u.email})</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <h4>Selected Users</h4>
                                {
                                    selectedUsers.map((u: User) => (
                                        <span key={`user-${u.id}`}
                                              className="border border-gray-300 block w-full py-1 px-2 rounded mb-2 flex justify-between">
                                        <span>
                                            {u.firstName} {u.lastName} ({u.email})
                                        </span>
                                        <span onClick={() => removeSelectedUser(u)}
                                              className="hover:cursor-pointer border border-gray-200 hover:bg-gray-300 bg-gray-200 px-1 roounded">
                                            &times;
                                        </span>
                                    </span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {
                    error && (
                        <Alert severity="error" message={error}/>
                    )
                }
                <div className="text-end flex justify-end">
                    <Button text="Submit" type="submit" color="primary" className="my-5" busy={saving}/>
                </div>
            </form>
        </SimpleContentLoader>
    )
}

export default GroupForm;