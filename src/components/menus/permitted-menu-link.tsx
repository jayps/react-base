import React, {PropsWithChildren} from 'react';
import {useAuth} from '../../context/auth/auth-context';
import MenuLink from './menu-link';

export interface PermittedMenuItemProps {
    requiredPermission: string;
    to?: string;
    onClick?: () => void;
    label: string;
}

const PermittedMenuLink: React.FC<PropsWithChildren<PermittedMenuItemProps>> = ({
                                                                                    requiredPermission,
                                                                                    to,
                                                                                    onClick,
                                                                                    label,
                                                                                    children
                                                                                }) => {
    const authState = useAuth();
    if (authState.user?.hasPermission(requiredPermission)) {
        return (
            <MenuLink to={to} label={label} onClick={onClick}>
                {children}
            </MenuLink>
        )
    }

    return null;
}

export default PermittedMenuLink;