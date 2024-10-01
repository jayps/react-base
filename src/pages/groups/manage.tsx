import React from 'react';
import PrivatePage from '../../components/containers/private-page';
import GroupForm, {GroupInputs} from '../../components/forms/group';
import {useParams} from 'react-router-dom';
import {useAuth} from '../../context/auth/auth-context';
import {Group} from '../../models/group';
import Card from '../../components/card';

const ManageGroupPage: React.FC = () => {
    let {id} = useParams();
    const authState = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [initialGroup, setInitialGroup] = React.useState<GroupInputs | undefined>()

    React.useEffect(() => {
        if (id) {
            setLoading(true);
            (async () => {
                try {
                    const httpResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/groups/${id}/`, {
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
                        setInitialGroup({
                            name: response.data.name,
                            permissions: response.data.permissions.map((p: any) => p.id),
                            userSet: response.data.userSet.map((u: any) => u.id),
                        });
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
                <h2>Manage Group</h2>
                {
                    (!id || (id && !loading)) && (
                        <GroupForm initialGroup={initialGroup}/>
                    )
                }
            </Card>
        </PrivatePage>
    )
}

export default ManageGroupPage;