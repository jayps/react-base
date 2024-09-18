import React, {createContext, PropsWithChildren, useContext, useReducer} from 'react';
import {jwtDecode} from "jwt-decode";
import {User} from '../../models/user';

export interface AuthState {
    accessToken?: string;
    refreshToken?: string;
    user?: User;
}

const tokenData = JSON.parse(localStorage.getItem('token') || '{}');
const initialAccessToken = tokenData.access;
const initialRefreshToken = tokenData.refresh;
let initialUser: User | undefined = undefined;

if (initialAccessToken) {
    const userInfo: any = jwtDecode(initialAccessToken);
    initialUser = new User(
        userInfo.user_id,
        userInfo.email,
        userInfo.first_name,
        userInfo.last_name,
        userInfo.is_staff,
        userInfo.is_superuser,
        userInfo.groups.map((g: any) => {
            return {
                id: g.id,
                name: g.name,
                permissions: g.permissions.map((p: any) => {
                    return {
                        id: p.id,
                        name: p.name,
                        codename: p.codename
                    }
                })
            }
        }),
    )
}

const initialState: AuthState = {
    accessToken: initialAccessToken || undefined,
    refreshToken: initialRefreshToken || undefined,
    user: initialUser,
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
            // Get user info from token
            const userInfo: any = jwtDecode(action.payload.access);

            return {
                ...state,
                accessToken: action.payload.access,
                refreshToken: action.payload.refresh,
                user: new User(
                    userInfo.user_id,
                    userInfo.email,
                    userInfo.first_name,
                    userInfo.last_name,
                    userInfo.is_staff,
                    userInfo.is_superuser,
                    userInfo.groups.map((g: any) => {
                        return {
                            id: g.id,
                            name: g.name,
                            permissions: g.permissions.map((p: any) => {
                                return {
                                    id: p.id,
                                    name: p.name,
                                    codename: p.codename
                                }
                            })
                        }
                    }),
                )
            };
        case AUTH_ACTION_TYPE.SET_USER:
            return {
                ...state,
                user: action.payload.user,
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




