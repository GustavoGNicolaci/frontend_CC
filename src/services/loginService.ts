import axios from 'axios';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key'; // Substitua por uma chave secreta segura

const encryptData = (data: string) => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const login = async (email: string, senha: string) => {
    try {
        const encryptedEmail = encryptData(email);
        const encryptedSenha = encryptData(senha);
        const response = await axios.post('http://localhost:5002/auth/login', { email: encryptedEmail, senha: encryptedSenha });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao fazer login');
    }
};

export const registro = async (email: string, nome: string, senha: string, cpf: string, telefone: string, confirmarSenha: string) => {
    try {
        const encryptedEmail = encryptData(email);
        const encryptedNome = encryptData(nome);
        const encryptedSenha = encryptData(senha);
        const encryptedCpf = encryptData(cpf);
        const encryptedTelefone = encryptData(telefone);
        const encryptedConfirmarSenha = encryptData(confirmarSenha);
        const response = await axios.post('http://localhost:5002/auth/register', {
            email: encryptedEmail,
            nome: encryptedNome,
            senha: encryptedSenha,
            cpf: encryptedCpf,
            telefone: encryptedTelefone,
            confirmarSenha: encryptedConfirmarSenha
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};