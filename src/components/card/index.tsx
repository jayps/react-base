import React, { PropsWithChildren } from 'react';

export interface CardProps {
    className?: string;
}

const Card: React.FC<PropsWithChildren<CardProps>> = ({
    className,
    children,
}) => {
    return (
        <div className={`card ${className}`} data-testid="card">
            {children}
        </div>
    );
};

export default Card;
