import React from 'react';
import {Link} from 'react-router-dom';

export type ButtonProps = {
    text: string;
    type?: 'button' | 'submit';
    id?: string;
    onClick?: () => void;
    link?: string;
    color?: 'primary' | 'secondary' | 'success';
    className?: string;
    disabled?: boolean;
    busy?: boolean;
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
                                           busy
                                       }) => {
    const computedClassName = `button ${color || 'secondary'} ${className}`;
    return (
        <button
            className={computedClassName}
            onClick={onClick}
            id={id}
            type={type || 'button'}
            disabled={disabled || busy || false}>
            {
                busy && (
                    <div className="loader"></div>
                )
            }
            {
                link ? (
                    <Link to={link}>
                        {text}
                    </Link>
                ) : (
                    <span>{text}</span>
                )
            }
        </button>
    )
}

export default Button;