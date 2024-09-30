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
    if (onClick) {
        return (
            <button className={computedClassName} onClick={onClick} id={id} type={type || 'button'}
                    disabled={disabled || busy || false}>
                {
                    busy && (
                        <div className="loader"></div>
                    )
                }
                <span>{text}</span>
            </button>
        )
    } else if (link) {
        return (
            <Link to={link} className={computedClassName} id={id}>
                {
                    busy && (
                        <div className="loader"></div>
                    )
                }
                <span>{text}</span>
            </Link>
        )
    } else {
        return (
            <button className={computedClassName} id={id} type={type || 'button'}
                    disabled={disabled || busy || false}>
                {
                    busy && (
                        <div className="loader"></div>
                    )
                }
                <span>{text}</span>
            </button>
        );
    }
}

export default Button;