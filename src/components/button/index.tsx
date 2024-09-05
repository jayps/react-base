import React from 'react';

export type ButtonProps = {
    text: string;
    type?: 'button' | 'submit';
    id?: string;
    onClick?: () => void;
    color?: 'primary' | 'secondary';
    className?: string;
    disabled?: boolean;
    busy?: boolean;
};

const Button: React.FC<ButtonProps> = ({
                                           text,
                                           type,
                                           id,
                                           onClick,
                                           color,
                                           className,
                                           disabled,
                                           busy
                                       }) => {
    const computedClassName = `${color || 'secondary'} ${className}`;
    return (
        <button className={computedClassName} onClick={onClick} id={id} type={type || 'button'}
                disabled={disabled || busy || false}>
            <span>{text}</span>
        </button>
    )
}

export default Button;