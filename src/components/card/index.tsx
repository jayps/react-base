import React, {PropsWithChildren} from 'react';

export interface CardProps {
    className?: string;
}

const Card: React.FC<PropsWithChildren<CardProps>> = ({className, children}) => {
    return (
        <div className={`card ${className}`}>
            {children}
        </div>
    )
}

export default Card;