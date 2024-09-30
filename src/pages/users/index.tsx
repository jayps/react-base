import React from 'react';
import PrivatePage from '../../components/containers/private-page';
import {AUTH_ACTION_TYPE, useAuth} from '../../context/auth/auth-context';
import {Group} from '../../models/group';
import {PaginatedData} from '../../models/response';
import {Link} from 'react-router-dom';
import Button from '../../components/button';
import {User} from '../../models/user';

const UsersPage: React.FC = () => {
    const authState = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string|undefined>(undefined);
    const [users, setUsers] = React.useState<PaginatedData<User>>({
        count: 0,
        next: '',
        previous: '',
        results: []
    });

    React.useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const httpResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/`, {
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
        })();
        setLoading(false);
    }, []);

    return (
        <PrivatePage>
            <div className="flex flex-col">
                <h2>Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Email
                            </th>
                            <th>
                                <Button text="+ New" color="primary" link="/users/new" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        users.results.map((user: User) => (
                            <tr key={user.id}>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    <Link to={`/users/${user.id}`}>View</Link>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <div>

                </div>
            </div>
        </PrivatePage>
    )
}

export default UsersPage;