import { useAuth } from '../../context/auth/auth-context';
import React from 'react';
import { Navigate } from 'react-router-dom';

export interface AuthenticatedRouteProps {
    comp: React.ReactNode;
    requiredPermission?: string;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
    comp,
    requiredPermission,
}) => {
    const authState = useAuth();

    if (authState.accessToken) {
        if (requiredPermission) {
            if (authState.user?.hasPermission(requiredPermission)) {
                return <>{comp}</>;
            } else {
                return <Navigate to="/login" replace />;
            }
        }

        return <>{comp}</>;
    }

    return <Navigate to="/login" replace />;
};

export default AuthenticatedRoute;
