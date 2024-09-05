import React, {PropsWithChildren} from 'react';

const PublicPage: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="container max-w-full bg-slate-200 min-h-screen">
            {children}
        </div>
    )
}

export default PublicPage;