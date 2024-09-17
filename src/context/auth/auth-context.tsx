import React, {createContext, PropsWithChildren, useContext, useReducer} from 'react';
import {User} from '../../models/user';

export interface AuthState {
    accessToken?: string;
    refreshToken?: string;
    user?: User;
}

const tokenData = JSON.parse(localStorage.getItem('token') || '{}');
const initialAccessToken = tokenData.access;
const initialRefreshToken = tokenData.refresh;
console.log('tokenData', tokenData)

const initialState: AuthState = {
    accessToken: initialAccessToken || undefined,
    refreshToken: initialRefreshToken || undefined,
    user: undefined,
}

export interface AuthAction {
    type: AUTH_ACTION_TYPE;
    payload: any; // TODO: Properly type this
}

const AuthContext = createContext(initialState);
const AuthDispatchContext = React.createContext<React.Dispatch<AuthAction> | null>(null);


export enum AUTH_ACTION_TYPE {
    SET_TOKEN = 'SET_TOKEN',
    SET_USER = 'SET_USER',
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AUTH_ACTION_TYPE.SET_TOKEN:
            return {
                ...state,
                accessToken: action.payload.access,
                refreshToken: action.payload.refresh,
            };
        case AUTH_ACTION_TYPE.SET_USER:
            return {
                ...state,
                accessToken: action.payload.access,
                refreshToken: action.payload.refresh,
            };
        default:
            return state;
    }
}

export const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [authState, dispatch] = useReducer(
        authReducer,
        initialState
    );

    return (
        <AuthContext.Provider value={authState}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export const useAuthDispatch = () => {
    return useContext(AuthDispatchContext);
}




