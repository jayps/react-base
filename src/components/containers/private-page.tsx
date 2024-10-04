import React, { PropsWithChildren } from 'react';
import MainMenu from '../menus/main-menu';
import logo from '../../media/logo.svg';

const PrivatePage: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="container p-5 min-w-full bg-slate-200 min-h-screen grid grid-cols-1 md:grid-cols-8 lg:grid-cols-10 gap-5">
            <div className="col-span-1 md:col-span-2 lg:col-span-2 min-h-full card">
                <img src={logo} alt="logo" className="mb-5 h-6" />
                <MainMenu />
            </div>
            <div className="col-span-1 md:col-span-6 lg:col-span-8">
                <div>{children}</div>
            </div>
        </div>
    );
};

export default PrivatePage;
