// src/services/authService.js
import axios from 'axios';

export const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao fazer login');
    }
};