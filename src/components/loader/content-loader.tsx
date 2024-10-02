import React, {PropsWithChildren} from 'react';

export interface LoaderProps {
    loading: boolean;
}

const SimpleContentLoader: React.FC<PropsWithChildren<LoaderProps>> = ({loading = false, children}) => {

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center">
                <div className="loader large mb-5">
                </div>
                Please wait...
            </div>
        );
    }

    return <>{children}</>
}

export default SimpleContentLoader;