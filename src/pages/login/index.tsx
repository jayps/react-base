import React from 'react';
import LoginForm from '../../components/forms/login';
import PublicPage from '../../components/containers/public-page';
import {AuthProvider} from '../../context/auth/auth-context';

const LoginPage: React.FC = () => {
    return (
        <PublicPage>
            <div className="grid grid-cols-2">
                <div className="flex flex-col justify-center items-center min-h-screen">
                    <LoginForm/>
                </div>
                <div className="flex flex-col justify-center items-center min-h-screen bg-slate-500">
                    <p>
                        Right of login page.
                    </p>
                    <p>
                        Put a background here, or some text.
                    </p>
                </div>
            </div>
        </PublicPage>
    )
}

export default LoginPage;