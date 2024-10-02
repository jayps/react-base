import React from 'react';
import PrivatePage from '../../components/containers/private-page';
import {AUTH_ACTION_TYPE, useAuth} from '../../context/auth/auth-context';
import {Group} from '../../models/group';
import {PaginatedData} from '../../models/response';
import {Link} from 'react-router-dom';
import Button from '../../components/button';
import Card from '../../components/card';
import SimpleContentLoader from '../../components/loader/content-loader';
import EyeIcon from '../../components/icons/eye';
import AddCircleIcon from '../../components/icons/add-circle';

const GroupsPage: React.FC = () => {
    const authState = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [groups, setGroups] = React.useState<PaginatedData<Group>>({
        count: 0,
        next: '',
        previous: '',
        results: []
    });

    React.useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const httpResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/groups/`, {
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
                    setGroups(response.data);
                }
            } catch (err) {
                setError('An error occurred. Please try again.')
            } finally {
                setLoading(false);
            }
        })();
    }, [authState.accessToken]);

    return (
        <PrivatePage>
            <Card className="flex flex-col">
                <h2>Groups</h2>
                <SimpleContentLoader loading={loading}>

                    <table>
                        <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Permissions
                            </th>
                            <th>
                                <Button link={`/groups/new`} color="success"
                                        icon={<AddCircleIcon height={24} width={24}/>}
                                        size="sm" text={"New Group"}/>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            groups.results.map((group: Group) => (
                                <tr key={group.id}>
                                    <td>
                                        {group.name}
                                    </td>
                                    <td>
                                        {group.permissions.length}
                                    </td>
                                    <td>
                                        <Button link={`/groups/${group.id}`} color="primary"
                                                icon={<EyeIcon height={24} width={24}/>} size="sm"
                                                text={"View"}/>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </SimpleContentLoader>
            </Card>
        </PrivatePage>
    )
}

export default GroupsPage;