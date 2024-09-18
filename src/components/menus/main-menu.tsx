import React from 'react';
import {Link} from 'react-router-dom';
import {AUTH_ACTION_TYPE, useAuth, useAuthDispatch} from '../../context/auth/auth-context';
import MenuLink from './menu-link';
import PermittedMenuLink from './permitted-menu-link';

const MainMenu: React.FC = () => {
    const authDispatch = useAuthDispatch();
    const authState = useAuth();
    const [adminExpanded, setAdminExpanded] = React.useState(false);


    const logout = () => {
        // @ts-ignore
        authDispatch({
            type: AUTH_ACTION_TYPE.LOGOUT,
        })
        localStorage.clear();
    }

    const toggleAdmin = () => {
        setAdminExpanded(!adminExpanded);
    }

    return (
        <ul>
            <MenuLink to="/dashboard" label="Dashboard" />
            <MenuLink label="Admin" onClick={toggleAdmin}>
                <ul className={`collapsed ${adminExpanded ? 'expanded': ''}`}>
                    <PermittedMenuLink requiredPermission="view_appuser" to="/dashboard" label="Users" />
                    <PermittedMenuLink requiredPermission="view_group" to="/dashboard" label="Groups" />
                </ul>
            </MenuLink>
            <MenuLink label="Logout" onClick={logout} />
        </ul>
    )
}

export default MainMenu;