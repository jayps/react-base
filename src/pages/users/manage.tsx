import React from 'react';
import PrivatePage from '../../components/containers/private-page';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth/auth-context';
import UserForm, { UserInputs } from '../../components/forms/user';
import Card from '../../components/card';
import SimpleContentLoader from '../../components/loader/content-loader';
import { fetchUserById } from '../../services/users';
import Alert from '../../components/alert';
import { User } from '../../models/user';

const ManageUserPage: React.FC = () => {
    const { id } = useParams();
    const authState = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [initialUser, setInitialUser] = React.useState<
        UserInputs | undefined
    >();

    React.useEffect(() => {
        if (id) {
            setLoading(true);
            (async () => {
                try {
                    const user: User = await fetchUserById(id);
                    setInitialUser(user);
                } catch (err) {
                    if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError('An error has occurred. Please try again.');
                    }
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [authState.accessToken, id]);

    return (
        <PrivatePage>
            <Card>
                <h2>Manage User</h2>
                <SimpleContentLoader loading={loading}>
                    {(!id || (id && !loading)) && (
                        <UserForm initialUser={initialUser} />
                    )}
                    <Alert severity="error" message={error} />
                </SimpleContentLoader>
            </Card>
        </PrivatePage>
    );
};

export default ManageUserPage;
