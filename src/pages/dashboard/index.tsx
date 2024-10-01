import React from 'react';
import PrivatePage from '../../components/containers/private-page';
import {useAuth} from '../../context/auth/auth-context';

const DashboardPage: React.FC = () => {
    const authState = useAuth();

    return (
        <PrivatePage>
            <div className="flex flex-col card">
                <h2>Dashboard</h2>
                <div>
                    Welcome, {authState.user?.firstName}
                </div>
            </div>
        </PrivatePage>
    )
}

export default DashboardPage;