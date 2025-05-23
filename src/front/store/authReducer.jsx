// authReducer.js
export const initialState = {
    user: null,
    isAuthenticated: false,
    apiUrl: import.meta.env.VITE_BACKEND_URL || "http://localhost:3001",
    message: null,
    isLoading: false
};

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            };

        case 'SET_MESSAGE':
            return {
                ...state,
                message: action.payload
            };

        case 'CLEAR_MESSAGE':
            return {
                ...state,
                message: null
            };

        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                message: action.payload || "Signup successful! Please login.",
                isLoading: false
            };

        case 'SIGNUP_ERROR':
            return {
                ...state,
                message: action.payload || "Signup failed",
                isLoading: false
            };

        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true,
                message: "Login successful!",
                isLoading: false
            };

        case 'LOGIN_ERROR':
            return {
                ...state,
                message: action.payload || "Login failed",
                isLoading: false
            };

        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                message: "Logged out successfully"
            };

        case 'VALIDATE_TOKEN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            };

        case 'VALIDATE_TOKEN_ERROR':
            return {
                ...state,
                user: null,
                isAuthenticated: false
            };

        default:
            return state;
    }
};