import {useAuth} from '../../context/auth/auth-context';
import React from 'react';
import {Navigate} from 'react-router-dom';

export interface UnauthenticatedRouteProps {
    comp: any;
}

const UnauthenticatedRoute: React.FC<UnauthenticatedRouteProps> = ({comp}) => {
    const authState = useAuth();

    React.useEffect(() => {
        console.log('UnauthenticatedRoute', authState)
    }, [authState]);

    if (!authState.accessToken) {
        return comp;
    }

    return <Navigate to="/dashboard" replace />;
}

export default UnauthenticatedRoute;