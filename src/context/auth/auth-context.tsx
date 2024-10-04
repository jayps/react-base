import React, {
    createContext,
    PropsWithChildren,
    useContext,
    useReducer,
} from 'react';
import { User } from '../../models/user';
import { Auth } from '../../models/auth';
import { getUserFromAccessToken } from '../../utils';

export interface AuthState {
    accessToken: string;
    refreshToken: string;
    user?: User;
}

const tokenData = JSON.parse(localStorage.getItem('token') || '{}');
const initialAccessToken = tokenData.access;
const initialRefreshToken = tokenData.refresh;
let initialUser: User | undefined = undefined;

if (initialAccessToken) {
    initialUser = getUserFromAccessToken(initialAccessToken);
}

const initialState: AuthState = {
    accessToken: initialAccessToken || '',
    refreshToken: initialRefreshToken || '',
    user: initialUser,
};

export interface AuthAction {
    type: AUTH_ACTION_TYPE;
    payload?: Auth;
}

const AuthContext = createContext(initialState);
const AuthDispatchContext =
    React.createContext<React.Dispatch<AuthAction> | null>(null);

export enum AUTH_ACTION_TYPE {
    // eslint-disable-next-line no-unused-vars
    SET_TOKEN = 'SET_TOKEN',
    // eslint-disable-next-line no-unused-vars
    SET_USER = 'SET_USER',
    // eslint-disable-next-line no-unused-vars
    LOGOUT = 'LOGOUT',
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AUTH_ACTION_TYPE.SET_TOKEN:
            // Get user info from token
            return {
                ...state,
                accessToken: (action.payload as Auth).access,
                refreshToken: (action.payload as Auth).refresh,
                user: getUserFromAccessToken((action.payload as Auth).access),
            };
        case AUTH_ACTION_TYPE.LOGOUT:
            return {
                ...state,
                user: undefined,
                accessToken: '',
                refreshToken: '',
            };
        default:
            return state;
    }
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={authState}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthState => {
    return useContext(AuthContext);
};

export const useAuthDispatch = (): React.Dispatch<AuthAction> | null => {
    return useContext(AuthDispatchContext);
};
