import React, {PropsWithChildren} from 'react';
import {useAuth} from '../../context/auth/auth-context';
import MenuLink from './menu-link';

export interface PermittedMenuItemProps {
    requiredPermission: string;
    to: string;
    label: string;
}

const PermittedMenuLink: React.FC<PropsWithChildren<PermittedMenuItemProps>> = ({
                                                                                    requiredPermission,
                                                                                    to,
                                                                                    label,
                                                                                    children
                                                                                }) => {
    const authState = useAuth();
    if (authState.user?.hasPermission(requiredPermission)) {
        return (
            <MenuLink to={to} label={label}>
                {children}
            </MenuLink>
        )
    }

    return null;
}

export default PermittedMenuLink;