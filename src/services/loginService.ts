import axios from 'axios';

export const login = async (email, senha) => {
    try {
        const response = await axios.post('http://localhost:5002/auth/login', { email, senha });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao fazer login');
    }
};


export const registro = async( email: string, nome: string, senha: string, cpf: string, telefone: string, confirmarSenha: string) => {
    try {
        const response = await axios.post('http://localhost:5002/auth/register', { email, nome, senha, cpf, telefone, confirmarSenha });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao fazer registro');
    }
}