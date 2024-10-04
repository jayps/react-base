import React from 'react';
import ReactDOM from 'react-dom/client';
import './loader.scss';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import NotFoundPage from './pages/not-found';
import RegisterPage from './pages/register';
import DashboardPage from './pages/dashboard';
import { AuthProvider } from './context/auth/auth-context';
import AuthenticatedRoute from './components/authenticated-route';
import UnauthenticatedRoute from './components/unauthenticated-route';
import GroupsPage from './pages/groups';
import ManageGroupPage from './pages/groups/manage';
import UsersPage from './pages/users';
import ManageUserPage from './pages/users/manage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <NotFoundPage />,
    },
    {
        path: '/login',
        element: <UnauthenticatedRoute comp={<LoginPage />} />,
    },
    {
        path: '/register',
        element: <UnauthenticatedRoute comp={<RegisterPage />} />,
    },
    {
        path: '/dashboard',
        element: <AuthenticatedRoute comp={<DashboardPage />} />,
    },
    {
        path: '/groups',
        element: (
            <AuthenticatedRoute
                comp={<GroupsPage />}
                requiredPermission="view_group"
            />
        ),
    },
    {
        path: '/groups/:id',
        element: (
            <AuthenticatedRoute
                comp={<ManageGroupPage />}
                requiredPermission="view_group"
            />
        ),
    },
    {
        path: '/groups/new',
        element: (
            <AuthenticatedRoute
                comp={<ManageGroupPage />}
                requiredPermission="view_group"
            />
        ),
    },
    {
        path: '/users',
        element: (
            <AuthenticatedRoute
                comp={<UsersPage />}
                requiredPermission="view_appuser"
            />
        ),
    },
    {
        path: '/users/:id',
        element: (
            <AuthenticatedRoute
                comp={<ManageUserPage />}
                requiredPermission="view_appuser"
            />
        ),
    },
    {
        path: '/users/new',
        element: (
            <AuthenticatedRoute
                comp={<ManageUserPage />}
                requiredPermission="view_appuser"
            />
        ),
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
