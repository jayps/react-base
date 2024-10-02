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
import DataTable, {TableProps} from '../../components/table';
import {User} from '../../models/user';
import {getGroups} from '../../services/groups';

const GroupsPage: React.FC = () => {
    const authState = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [groupsTable, setGroupsTable] = React.useState<TableProps | undefined>();
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
                const groups = await getGroups();
                setGroups(groups);
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
    }, [authState.accessToken]);

    React.useEffect(() => {
        setGroupsTable({
            headerRow: {
                cells: [
                    {content: 'Name'},
                    {content: 'Permissions'},
                    {
                        content: <Button link={`/groups/new`} color="success"
                                         icon={<AddCircleIcon height={24} width={24}/>}
                                         size="sm" text={"New Group"}/>
                    }
                ]
            },
            rows: groups.results.map((group: Group) => ({
                cells: [
                    {content: group.name},
                    {content: group.permissions.length},
                    {
                        content: <Button link={`/groups/${group.id}`} color="primary"
                                         icon={<EyeIcon height={24} width={24}/>} size="sm"
                                         text={"View"}/>
                    }
                ]
            }))
        });
    }, [groups]);

    return (
        <PrivatePage>
            <Card className="flex flex-col">
                <h2>Groups</h2>
                <SimpleContentLoader loading={loading}>
                    {
                        groupsTable && (
                            <DataTable headerRow={groupsTable.headerRow} rows={groupsTable.rows}/>
                        )
                    }
                </SimpleContentLoader>
            </Card>
        </PrivatePage>
    )
}

export default GroupsPage;