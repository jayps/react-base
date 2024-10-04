import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Alert from '../../alert';
import Button from '../../button';
import { useNavigate, useParams } from 'react-router-dom';
import { saveUser } from '../../../services/users';
import Input from '../elements/input/Input';
import Checkbox from '../elements/checkbox';

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

const UserForm: React.FC<UserFormProps> = ({ initialUser }) => {
    const [errorMessage, setErrorMessage] = React.useState<
        string | undefined
    >();
    const [saving, setSaving] = React.useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<UserInputs>({
        defaultValues: initialUser,
    });

    const onSubmit: SubmitHandler<UserInputs> = async (data) => {
        setSaving(true);
        try {
            await saveUser(
                data.email,
                data.firstName,
                data.lastName,
                data.isStaff,
                data.isSuperuser,
                data.isActive,
                id
            );
            navigate('/users');
        } catch (err) {
            if (err instanceof Error) {
                setErrorMessage(err.message);
            } else {
                setErrorMessage('An error has occurred. Please try again.');
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                name="email"
                label="E-mail address"
                type="email"
                errors={errors}
                required={true}
                control={control}
            />
            <Input
                name="firstName"
                label="First Name"
                errors={errors}
                required={true}
                control={control}
            />
            <Input
                name="lastName"
                label="Last Name"
                errors={errors}
                required={true}
                control={control}
            />
            <Checkbox
                name="isActive"
                errors={errors}
                control={control}
                defaultValue={initialUser?.isActive}
                label="Is Active"
            />
            <Checkbox
                name="isStaff"
                errors={errors}
                control={control}
                defaultValue={initialUser?.isStaff}
                label="Is Staff"
            />
            <Checkbox
                name="isSuperuser"
                errors={errors}
                control={control}
                defaultValue={initialUser?.isSuperuser}
                label="Is Superuser"
            />
            <Alert severity="error" message={errorMessage} />
            <div className="text-end flex justify-end">
                <div>
                    <Button
                        text="Submit"
                        type="submit"
                        color="primary"
                        className="my-5"
                        busy={saving}
                    />
                </div>
            </div>
        </form>
    );
};

export default UserForm;
