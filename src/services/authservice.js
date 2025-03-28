import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://127.0.0.1:8000/api/auth/'; // Update this with your actual backend URL

// 🔹 Register a new user
export const register = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}register/`, {
            username,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        throw error;
    }
};

// 🔹 Login user and store the token
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}login/`, {
            username,
            password,
        });
        const token = response.data.token;
        await AsyncStorage.setItem('userToken', token); // Store token
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error;
    }
};

// 🔹 Fetch user data (Protected Route)
export const getUser = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error('No token found');

        const response = await axios.get(`${API_URL}user/`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error('Fetch user error:', error.response?.data || error.message);
        throw error;
    }
};

// 🔹 Logout user (Remove Token)
export const logout = async () => {
    try {
        await AsyncStorage.removeItem('userToken');
        return true;
    } catch (error) {
        console.error('Logout error:', error.message);
        throw error;
    }
};
