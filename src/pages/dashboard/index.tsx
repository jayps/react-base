import React from 'react';
import PrivatePage from '../../components/containers/private-page';
import {useAuth} from '../../context/auth/auth-context';

const DashboardPage: React.FC = () => {
    const authState = useAuth();

    return (
        <PrivatePage>
            <div className="grid grid-cols-2">
                Dashboard<br />
                Welcome, {authState.accessToken}
            </div>
        </PrivatePage>
    )
}

export default DashboardPage;