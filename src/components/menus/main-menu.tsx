import React from 'react';
import {Link} from 'react-router-dom';
import {AUTH_ACTION_TYPE, useAuthDispatch} from '../../context/auth/auth-context';

const MainMenu: React.FC = () => {
    const authDispatch = useAuthDispatch();


    const logout = () => {
        // @ts-ignore
        authDispatch({
            type: AUTH_ACTION_TYPE.LOGOUT,
        })
        localStorage.clear();
    }
    return (
        <ul>
            <li className="menu-item-link">
                <Link to="/dashboard">
                    Dashboard
                </Link>
            </li>
            <li className="menu-item-link" onClick={logout}>
                Logout
            </li>
        </ul>
    )
}

export default MainMenu;