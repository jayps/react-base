import React from 'react';
import PrivatePage from '../../components/containers/private-page';
import {useAuth} from '../../context/auth/auth-context';
import {PaginatedData} from '../../models/response';
import {Link} from 'react-router-dom';
import Button from '../../components/button';
import {User} from '../../models/user';
import EyeIcon from '../../components/icons/eye';
import AddCircleIcon from '../../components/icons/add-circle';
import Card from '../../components/card';
import SimpleContentLoader from '../../components/loader/content-loader';
import DataTable, {TableProps} from '../../components/table';
import {getUsers} from '../../services/users';
import Alert from '../../components/alert';

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
    const [usersTable, setUsersTable] = React.useState<TableProps | undefined>();

    const [page, setPage] = React.useState(1);

    React.useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const fetchedUsers = await getUsers(page);
                setUsers(fetchedUsers);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError('An error has occurred. Please try again.');
                }
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
        setUsersTable({
            headerRow: {
                cells: [
                    {content: 'E-mail', width: '25%'},
                    {content: 'First Name', width: '25%'},
                    {content: 'Last Name', width: '25%'},
                    {
                        content: <Button link={`/users/new`} color="success"
                                         icon={<AddCircleIcon height={24} width={24}/>}
                                         size="sm" text={"New User"}/>,
                        width: '25%'
                    }
                ]
            },
            rows: users.results.map((user: User) => ({
                cells: [
                    {
                        width: '25%',
                        content: <Link to={`/users/${user.id}`}>
                            {user.email}
                        </Link>
                    },
                    {content: user.firstName, width: '25%'},
                    {content: user.lastName, width: '25%'},
                    {
                        width: '25%',
                        content: <Button link={`/users/${user.id}`} color="primary"
                                         icon={<EyeIcon height={24} width={24}/>} size="sm"
                                         text={"View"}/>
                    }
                ]
            }))
        });
    }, [users]);

    return (
        <PrivatePage>
            <Card className="flex flex-col">
                <h2>Users</h2>
                <SimpleContentLoader loading={loading}>
                    {
                        usersTable && (
                            <DataTable headerRow={usersTable.headerRow} rows={usersTable.rows} />
                        )
                    }
                    <div className="flex justify-center items-center mt-5">
                        {users.previous &&
                            <Button onClick={loadPrevious} color="primary" text="&lt;" className="me-2"/>}
                        <span>
                                    Page {page} of {Math.ceil(users.count / 15)}
                                </span>
                        {users.next && <Button onClick={loadNext} color="primary" text="&gt;" className="ms-2"/>}
                    </div>
                    <Alert severity="error" message={error} />
                </SimpleContentLoader>
            </Card>
        </PrivatePage>
    )
}

export default UsersPage;