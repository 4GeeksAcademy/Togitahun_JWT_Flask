import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { authReducer, initialState } from './authReducer';

// Crear el Context
const AuthContext = createContext();

// Hook personalizado para usar el context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider');
    }
    return context;
};

// Proveedor del Context
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Acciones
    const actions = {
        signup: async (email, password) => {
            dispatch({ type: 'SET_LOADING', payload: true });

            try {
                const response = await fetch(`${state.apiUrl}/api/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    dispatch({ type: 'SIGNUP_ERROR', payload: data.message });
                    return false;
                }

                dispatch({ type: 'SIGNUP_SUCCESS', payload: data.message });
                return true;
            } catch (error) {
                console.error("Signup error:", error);
                dispatch({ type: 'SIGNUP_ERROR', payload: "An error occurred during signup" });
                return false;
            }
        },

        login: async (email, password) => {
            dispatch({ type: 'SET_LOADING', payload: true });

            try {
                const response = await fetch(`${state.apiUrl}/api/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    dispatch({ type: 'LOGIN_ERROR', payload: data.message });
                    return false;
                }

                // Guardar token en sessionStorage
                sessionStorage.setItem("token", data.token);

                // Actualizar estado
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: { user: data.user }
                });

                return true;
            } catch (error) {
                console.error("Login error:", error);
                dispatch({ type: 'LOGIN_ERROR', payload: "An error occurred during login" });
                return false;
            }
        },

        logout: () => {
            // Remover token de sessionStorage
            sessionStorage.removeItem("token");

            // Actualizar estado
            dispatch({ type: 'LOGOUT' });
        },

        validateToken: async () => {
            const token = sessionStorage.getItem("token");

            if (!token) {
                dispatch({ type: 'VALIDATE_TOKEN_ERROR' });
                return;
            }

            try {
                const response = await fetch(`${state.apiUrl}/api/user`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    // Token inválido
                    sessionStorage.removeItem("token");
                    dispatch({ type: 'VALIDATE_TOKEN_ERROR' });
                    return;
                }

                const userData = await response.json();
                dispatch({ type: 'VALIDATE_TOKEN_SUCCESS', payload: userData });
            } catch (error) {
                console.error("Token validation error:", error);
                sessionStorage.removeItem("token");
                dispatch({ type: 'VALIDATE_TOKEN_ERROR' });
            }
        },

        clearMessage: () => {
            dispatch({ type: 'CLEAR_MESSAGE' });
        }
    };

    // Validar token al cargar la app
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            actions.validateToken();
        }
    }, []);

    const value = {
        ...state,
        ...actions
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};