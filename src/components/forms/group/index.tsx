import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Alert from '../../alert';
import Button from '../../button';
import { useNavigate, useParams } from 'react-router-dom';
import { Permission } from '../../../models/permission';
import { User } from '../../../models/user';
import { getPermissions } from '../../../services/permissions';
import { getAllUsers } from '../../../services/users';
import SimpleContentLoader from '../../loader/content-loader';
import { saveGroup } from '../../../services/groups';
import Input from '../elements/input/Input';
import MultiSelect from '../../multi-select';

export interface GroupInputs {
    name: string;
    userSet: string[];
    permissions: number[];
}

export interface GroupFormProps {
    initialGroup?: GroupInputs;
}

const GroupForm: React.FC<GroupFormProps> = ({ initialGroup }) => {
    const [error, setError] = React.useState<string | undefined>();
    const [saving, setSaving] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [permissions, setPermissions] = React.useState<Permission[]>([]);
    const [selectedPermissions, setSelectedPermissions] = React.useState<
        Permission[]
    >([]);
    const [users, setUsers] = React.useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<GroupInputs>({
        defaultValues: initialGroup,
    });

    const loadData = async (): Promise<void> => {
        setLoading(true);
        try {
            const fetchedPermissions = await getPermissions();
            setPermissions(
                fetchedPermissions.map((permission: Permission) => ({
                    name: permission.name,
                    id: permission.id,
                    codename: permission.codename,
                }))
            );

            const fetchedUsers = await getAllUsers();
            setUsers(fetchedUsers);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An error has occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

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
                setError(err.message);
            } else {
                setError('An error has occurred. Please try again.');
            }
        } finally {
            setSaving(false);
        }
    };

    const selectPermission = (permissionId: string): void => {
        const foundPermission: Permission | undefined = permissions.find(
            (p: Permission) => p.id === parseInt(permissionId)
        );
        if (foundPermission) {
            setSelectedPermissions([...selectedPermissions, foundPermission]);
        }
    };
    const selectUser = (userId: string): void => {
        const foundUser: User | undefined = users.find(
            (u: User) => u.id === userId
        );
        if (foundUser) {
            setSelectedUsers([...selectedUsers, foundUser]);
        }
    };

    const removeSelectedPermission = (permissionId: number): void => {
        setSelectedPermissions(
            selectedPermissions.filter((p: Permission) => p.id !== permissionId)
        );
    };

    const removeSelectedUser = (userId: string): void => {
        setSelectedUsers(selectedUsers.filter((u: User) => u.id !== userId));
    };

    React.useEffect(() => {
        (async () => {
            await loadData();
        })();
    }, []);

    React.useEffect(() => {
        if (initialGroup) {
            setSelectedPermissions(
                permissions.filter(
                    (p: Permission) =>
                        initialGroup.permissions.findIndex(
                            (initialPermission) => initialPermission === p.id
                        ) > -1
                )
            );
            setSelectedUsers(
                users.filter(
                    (u: User) =>
                        initialGroup.userSet.findIndex(
                            (initialUser) => initialUser === u.id
                        ) > -1
                )
            );
        }
    }, [initialGroup, permissions, users]);

    return (
        <SimpleContentLoader loading={loading}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input
                        name="name"
                        errors={errors}
                        required={true}
                        control={control}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <MultiSelect
                            onSelect={selectPermission}
                            heading="Permissions"
                            prompt="Select permission to add"
                            selectedText="Selected Permissions"
                            options={permissions
                                .filter(
                                    (p: Permission) =>
                                        selectedPermissions.findIndex(
                                            (selectedPermission) =>
                                                selectedPermission.id === p.id
                                        ) === -1
                                )
                                .map((p: Permission) => ({
                                    value: p.id,
                                    label: p.name,
                                }))}
                            selectedOptions={selectedPermissions.map(
                                (p: Permission) => ({
                                    value: p.id,
                                    label: p.name,
                                })
                            )}
                            onRemove={removeSelectedPermission}
                            id="permission-selector"
                        />
                        <MultiSelect
                            onSelect={selectUser}
                            heading="Users"
                            prompt="Select a user to add"
                            selectedText="Selected Users"
                            options={users
                                .filter(
                                    (u: User) =>
                                        selectedUsers.findIndex(
                                            (selectedUser) =>
                                                selectedUser.id === u.id
                                        ) === -1
                                )
                                .map((u: User) => ({
                                    value: u.id,
                                    label: `${u.firstName} ${u.lastName} (${u.email})`,
                                }))}
                            selectedOptions={selectedUsers.map((u: User) => ({
                                value: u.id,
                                label: `${u.firstName} ${u.lastName} (${u.email})`,
                            }))}
                            onRemove={removeSelectedUser}
                            id="user-selector"
                        />
                    </div>
                </div>
                <Alert severity="error" message={error} />
                <div className="text-end flex justify-end">
                    <Button
                        text="Submit"
                        type="submit"
                        color="primary"
                        className="my-5"
                        busy={saving}
                    />
                </div>
            </form>
        </SimpleContentLoader>
    );
};

export default GroupForm;
