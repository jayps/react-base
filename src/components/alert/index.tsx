import React, {PropsWithChildren} from 'react';

export type AlertProps = {
    severity: 'success' | 'warning' | 'error' | 'info';
}

const Alert: React.FC<PropsWithChildren<AlertProps>> = ({severity, children}) => {
    return (
        <div className={`alert ${severity}`}>
            {children}
        </div>
    )
}

export default Alert;