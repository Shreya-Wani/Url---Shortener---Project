// FILE: src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Lazy initialization to persist state
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        return token ? { token } : null;
    });

    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        try {
            const response = await api.post('/users/login', { email, password });

            if (response.data.success) {
                // Backend returns { data: { token: "..." } }
                const { token } = response.data.data;

                localStorage.setItem('token', token);
                setUser({ token });
                return { success: true };
            }
            return { success: false, message: 'Login failed' };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const signup = async (userData) => {
        try {
            const response = await api.post('/users/signup', userData);
            return {
                success: response.data.success,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Signup failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
