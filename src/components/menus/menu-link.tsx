import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

export interface MenuItemProps {
    to?: string;
    onClick?: () => void;
    label: string;
}

export const MenuLink: React.FC<PropsWithChildren<MenuItemProps>> = ({
    to,
    onClick,
    label,
    children,
}) => {
    if (to) {
        return (
            <li className="menu-item-link">
                <Link to={to}>
                    <span>{label}</span>
                    {children}
                </Link>
            </li>
        );
    } else if (onClick) {
        return (
            <li className="menu-item-link" onClick={onClick}>
                <span>{label}</span>
                {children}
            </li>
        );
    }

    return null;
};

export default MenuLink;
