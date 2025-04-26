import axios from 'axios';

/**
 * Busca os dados do carrinho do usuário autenticado.
 * @param token Token de autenticação do usuário.
 * @returns Os dados do carrinho.
 */
export const fetchCart = async (token: string) => {
    try {
        const response = await axios.get('http://localhost:5002/carrinho', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar o carrinho:', error);
        throw error;
    }
};