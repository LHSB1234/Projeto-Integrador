import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Configure o axios para incluir credenciais por padrão
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Adiciona esta linha
});

// Função para obter postagens
export const getPosts = async () => {
    try {
        const response = await axiosInstance.get(`/index.php`); // Use o axiosInstance aqui
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar postagens", error);
        throw error;
    }
};

// Exporte a instância do Axios
export default axiosInstance;
