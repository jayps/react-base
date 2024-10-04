import React from 'react';

export type AlertProps = {
    severity: 'success' | 'warning' | 'error' | 'info';
    message?: string;
};

const Alert: React.FC<AlertProps> = ({ severity, message }) => {
    if (!message) {
        return null;
    }

    return (
        <div className={`alert ${severity}`} data-testid="alert">
            {message}
        </div>
    );
};

export default Alert;
