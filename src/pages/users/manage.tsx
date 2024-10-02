import React from 'react';
import PrivatePage from '../../components/containers/private-page';
import GroupForm, {GroupInputs} from '../../components/forms/group';
import {useParams} from 'react-router-dom';
import {useAuth} from '../../context/auth/auth-context';
import {Group} from '../../models/group';
import UserForm, {UserInputs} from '../../components/forms/user';
import Card from '../../components/card';
import SimpleContentLoader from '../../components/loader/content-loader';

const ManageUserPage: React.FC = () => {
    let { id } = useParams();
    const authState = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string|undefined>(undefined);
    const [initialUser, setInitialUser] = React.useState<UserInputs|undefined>()

    React.useEffect(() => {
        if (id) {
            setLoading(true);
            (async () => {
                try {
                    const httpResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${id}/`, {
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
                        setInitialUser(response.data);
                    }
                } catch (err) {
                    setError('An error occurred. Please try again.')
                }
                setLoading(false);

            })();
        }
    }, [authState.accessToken, id]);

    return (
        <PrivatePage>
            <Card>
                <h2>Manage User</h2>
                <SimpleContentLoader loading={loading}>
                    {
                        (!id || (id && !loading)) && (
                            <UserForm initialUser={initialUser} />
                        )
                    }
                </SimpleContentLoader>
            </Card>
        </PrivatePage>
    )
}

export default ManageUserPage;