import React from 'react';
import PublicPage from '../../components/containers/public-page';
import LoginForm from '../../components/forms/login';
import {Link} from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <PublicPage>
            <div className="grid grid-cols-2">
                <div className="flex flex-col justify-center items-center min-h-screen">
                    <Link to="/login">Login</Link>
                </div>
                <div className="flex flex-col justify-center items-center min-h-screen">
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

export default HomePage;