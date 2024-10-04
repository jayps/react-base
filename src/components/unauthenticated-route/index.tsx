import { useAuth } from '../../context/auth/auth-context';
import React from 'react';
import { Navigate } from 'react-router-dom';

export interface UnauthenticatedRouteProps {
    comp: React.ReactNode;
}

const UnauthenticatedRoute: React.FC<UnauthenticatedRouteProps> = ({
    comp,
}) => {
    const authState = useAuth();

    if (!authState.accessToken) {
        return <>{comp}</>;
    }

    return <Navigate to="/dashboard" replace />;
};

export default UnauthenticatedRoute;
