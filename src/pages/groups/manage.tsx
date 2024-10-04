import React from 'react';
import PrivatePage from '../../components/containers/private-page';
import GroupForm, { GroupInputs } from '../../components/forms/group';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth/auth-context';
import Card from '../../components/card';
import SimpleContentLoader from '../../components/loader/content-loader';
import { fetchGroupById } from '../../services/groups';
import Alert from '../../components/alert';
import { Permission } from '../../models/permission';
import { User } from '../../models/user';

const ManageGroupPage: React.FC = () => {
    const { id } = useParams();
    const authState = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [initialGroup, setInitialGroup] = React.useState<
        GroupInputs | undefined
    >();

    React.useEffect(() => {
        if (id) {
            setLoading(true);
            (async () => {
                try {
                    const group = await fetchGroupById(id);
                    setInitialGroup({
                        name: group.name,
                        permissions: group.permissions.map(
                            (p: Permission) => p.id
                        ),
                        userSet: group.userSet?.map((u: User) => u.id) || [],
                    });
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
                <h2>Manage Group</h2>
                <SimpleContentLoader loading={loading}>
                    {(!id || (id && !loading)) && (
                        <GroupForm initialGroup={initialGroup} />
                    )}
                    <Alert severity="error" message={error} />
                </SimpleContentLoader>
            </Card>
        </PrivatePage>
    );
};

export default ManageGroupPage;
