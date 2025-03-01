import axios from 'axios';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'default-secret-key';
const API_URL = 'http://localhost:5002';

const encryptData = (data: string) => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            throw new Error(`Erro: ${error.response.data.message || 'Erro ao fazer a requisição'}`);
        } else if (error.request) {
            throw new Error('Erro: Nenhuma resposta recebida do servidor');
        } else {
            throw new Error(`Erro: ${error.message}`);
        }
    } else {
        throw new Error('Erro desconhecido');
    }
};

export const login = async (email: string, senha: string) => {
    try {
        const encryptedEmail = encryptData(email);
        const encryptedSenha = encryptData(senha);
        const response = await axios.post(`${API_URL}/auth/login`, { email: encryptedEmail, senha: encryptedSenha });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const registro = async (
    email: string,
    nome: string,
    senha: string,
    cpf: string,
    telefone: string,
    confirmarSenha: string,
    cep: string,
    rua: string,
    estado: string,
    cidade: string,
    bairro: string,
    numero: string,
    complemento?: string
) => {
    try {
        const encryptedData = {
            email: encryptData(email),
            nome: encryptData(nome),
            senha: encryptData(senha),
            cpf: encryptData(cpf),
            telefone: encryptData(telefone),
            confirmarSenha: encryptData(confirmarSenha),
            endereco: {
                cep: encryptData(cep),
                rua: encryptData(rua),
                estado: encryptData(estado),
                cidade: encryptData(cidade),
                bairro: encryptData(bairro),
                numero: encryptData(numero),
                complemento: complemento ? encryptData(complemento) : ''
            }
        };

        const response = await axios.post(`${API_URL}/auth/register`, encryptedData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};