import React from 'react';
import {
    AUTH_ACTION_TYPE,
    useAuthDispatch,
} from '../../context/auth/auth-context';
import MenuLink from './menu-link';
import PermittedMenuLink from './permitted-menu-link';

const MainMenu: React.FC = () => {
    const authDispatch = useAuthDispatch();
    const [adminExpanded, setAdminExpanded] = React.useState(false);

    const logout = (): void => {
        if (authDispatch) {
            authDispatch({
                type: AUTH_ACTION_TYPE.LOGOUT,
            });
        }
        localStorage.clear();
    };

    const toggleAdmin = (): void => {
        setAdminExpanded(!adminExpanded);
    };

    return (
        <ul>
            <MenuLink to="/dashboard" label="Dashboard" />
            <PermittedMenuLink
                label="Admin"
                onClick={toggleAdmin}
                requiredPermission="view_group"
            >
                <ul className={`collapsed ${adminExpanded ? 'expanded' : ''}`}>
                    <PermittedMenuLink
                        requiredPermission="view_appuser"
                        to="/users"
                        label="Users"
                    />
                    <PermittedMenuLink
                        requiredPermission="view_group"
                        to="/groups"
                        label="Groups"
                    />
                </ul>
            </PermittedMenuLink>
            <MenuLink label="Logout" onClick={logout} />
        </ul>
    );
};

export default MainMenu;
