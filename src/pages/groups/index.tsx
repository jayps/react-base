import React from 'react';
import PrivatePage from '../../components/containers/private-page';
import {AUTH_ACTION_TYPE, useAuth} from '../../context/auth/auth-context';
import {Group} from '../../models/group';
import {PaginatedData} from '../../models/response';
import {Link} from 'react-router-dom';
import Button from '../../components/button';
import Card from '../../components/card';

const GroupsPage: React.FC = () => {
    const authState = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string|undefined>(undefined);
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
            }
        })();
        setLoading(false);
    }, []);

    return (
        <PrivatePage>
            <Card className="flex flex-col">
                <h2>Groups</h2>
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
                                <Button text="+ New" color="primary" link="/groups/new" />
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
                                    <Link to={`/groups/${group.id}`}>View</Link>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </Card>
        </PrivatePage>
    )
}

export default GroupsPage;