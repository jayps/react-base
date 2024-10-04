import React from 'react';
import PublicPage from '../../components/containers/public-page';
import RegisterForm from '../../components/forms/register';

const RegisterPage: React.FC = () => {
    return (
        <PublicPage>
            <div className="grid grid-cols-2">
                <div className="flex flex-col justify-center items-center min-h-screen">
                    <RegisterForm />
                </div>
                <div className="flex flex-col justify-center items-center min-h-screen bg-slate-500">
                    <p>Right of register page.</p>
                    <p>Put a background here, or some text.</p>
                </div>
            </div>
        </PublicPage>
    );
};

export default RegisterPage;
