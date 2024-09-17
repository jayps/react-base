import {useAuth} from '../../context/auth/auth-context';
import React from 'react';
import {Navigate} from 'react-router-dom';

export interface AuthenticatedRouteProps {
    comp: any;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({comp}) => {
    const authState = useAuth();

    React.useEffect(() => {
        console.log('AuthenticatedRoute', authState.accessToken)
    }, [authState.accessToken]);

    if (authState.accessToken) {
        return comp;
    }

    return <Navigate to="/login" replace />;
}

export default AuthenticatedRoute;