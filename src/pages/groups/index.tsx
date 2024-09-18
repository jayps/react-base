import React from 'react';
import PrivatePage from '../../components/containers/private-page';
import {useAuth} from '../../context/auth/auth-context';

const GroupsPage: React.FC = () => {
    const authState = useAuth();

    return (
        <PrivatePage>
            <div className="flex flex-col">
                <h2>Groups</h2>
                <div>
                    Welcome, {authState.user?.firstName}
                </div>
            </div>
        </PrivatePage>
    )
}

export default GroupsPage;