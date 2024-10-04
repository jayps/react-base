import React from 'react';
import { Link } from 'react-router-dom';

export type ButtonProps = {
    text?: string;
    type?: 'button' | 'submit';
    id?: string;
    onClick?: () => void;
    link?: string;
    color?: 'primary' | 'secondary' | 'success';
    className?: string;
    disabled?: boolean;
    busy?: boolean;
    icon?: React.ReactNode;
    size?: 'sm' | 'lg';
};

const Button: React.FC<ButtonProps> = ({
    text,
    type,
    id,
    onClick,
    link,
    color,
    className,
    disabled,
    busy,
    icon,
    size,
}) => {
    let computedClassName = `button ${color || 'secondary'}`;
    if (className) {
        computedClassName += `${computedClassName} ${className}`;
    }
    if (size) {
        computedClassName += `${computedClassName} ${size}`;
    }
    return (
        <button
            className={computedClassName}
            onClick={onClick}
            id={id}
            type={type || 'button'}
            disabled={disabled || busy || false}
            data-testid="button"
        >
            <div className="flex justify-center">
                {busy && (
                    <div className="loader" data-testid="button-loader"></div>
                )}
                {link ? (
                    <Link to={link} data-testid="button-link">
                        {icon}
                        {text && <span>{text}</span>}
                    </Link>
                ) : (
                    <>
                        {icon}
                        {text && <span>{text}</span>}
                    </>
                )}
            </div>
        </button>
    );
};

export default Button;
