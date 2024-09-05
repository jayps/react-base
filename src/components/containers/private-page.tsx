import React, {PropsWithChildren} from 'react';

const PrivatePage: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="container max-w-full bg-slate-200 min-h-screen">
            <div className="container bg-emerald-900">
                MENU
            </div>
            {children}
        </div>
    )
}

export default PrivatePage;