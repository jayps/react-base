import React from 'react';
import PrivatePage from '../../components/containers/private-page';
import { useAuth } from '../../context/auth/auth-context';
import Card from '../../components/card';

const DashboardPage: React.FC = () => {
    const authState = useAuth();

    return (
        <PrivatePage>
            <Card>
                <h2>Dashboard</h2>
                <div>Welcome, {authState.user?.firstName}</div>
            </Card>
        </PrivatePage>
    );
};

export default DashboardPage;
