import React from 'react';
import PrivatePage from '../../components/containers/private-page';
import {AUTH_ACTION_TYPE, useAuth} from '../../context/auth/auth-context';
import {Group} from '../../models/group';
import {PaginatedData} from '../../models/response';
import {Link} from 'react-router-dom';
import Button from '../../components/button';
import {User} from '../../models/user';
import EyeIcon from '../../components/icons/eye';
import AddCircleIcon from '../../components/icons/add-circle';
import Card from '../../components/card';
import ContentLoader from 'react-content-loader';
import TableLoader from '../../components/loader/table';

const UsersPage: React.FC = () => {
    const authState = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [users, setUsers] = React.useState<PaginatedData<User>>({
        count: 0,
        next: '',
        previous: '',
        results: []
    });

    const [page, setPage] = React.useState(1);

    React.useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const httpResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/?page=${page}`, {
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
            } finally {
                setLoading(false);
            }
        })();
    }, [authState.accessToken, page]);

    const loadNext = () => {
        setLoading(true);
        setPage(page + 1);
    }

    const loadPrevious = () => {
        setLoading(true);
        setPage(page - 1);
    }

    React.useEffect(() => {
        console.log(loading);
    }, [loading]);

    return (
        <PrivatePage>
            <Card className="flex flex-col">
                <h2>Users</h2>
                <TableLoader loading={loading} columns={1} rows={5}>
                    <table>
                        <thead>
                        <tr>
                            <th style={{width: '25%'}}>
                                Email
                            </th>
                            <th style={{width: '25%'}}>
                                First Name
                            </th>
                            <th style={{width: '25%'}}>
                                Last Name
                            </th>
                            <th style={{width: '25%'}} className="text-end pb-5">
                                <Button link={`/users/new`} color="success"
                                        icon={<AddCircleIcon height={24} width={24}/>}
                                        size="sm" text={"New User"}/>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users.results.map((user: User) => (
                                <tr key={user.id}>
                                    <td style={{width: '25%'}} className="mb-5">
                                        <Link to={`/users/${user.id}`}>
                                            {user.email}
                                        </Link>
                                    </td>
                                    <td style={{width: '25%'}} className="mb-5">
                                        {user.firstName}
                                    </td>
                                    <td style={{width: '25%'}} className="mb-5">
                                        {user.lastName}
                                    </td>
                                    <td style={{width: '25%'}} className="text-end mb-5">
                                        <Button link={`/users/${user.id}`} color="primary"
                                                icon={<EyeIcon height={24} width={24}/>} size="sm"
                                                text={"View"}/>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    <div className="flex justify-center items-center mt-5">
                        {users.previous &&
                            <Button onClick={loadPrevious} color="primary" text="&lt;" className="me-2"/>}
                        <span>
                                    Page {page} of {Math.ceil(users.count / 15)}
                                </span>
                        {users.next && <Button onClick={loadNext} color="primary" text="&gt;" className="ms-2"/>}
                    </div>
                </TableLoader>
            </Card>
        </PrivatePage>
    )
}

export default UsersPage;