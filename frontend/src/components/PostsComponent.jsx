import React, { useEffect, useState } from 'react';

const PostsComponent = () => {
    const [posts, setPosts] = useState([]); // Estado para armazenar os posts
    const apiUrl = 'http://localhost:8082/www/4SM/pj2/pj2/backend/routes/routes.php';

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET', // Método da requisição
                    credentials: 'include' // Incluir cookies ou credenciais, se necessário
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const data = await response.json(); // Converte a resposta para JSON
                setPosts(data); // Atualiza o estado com os posts recebidos
            } catch (error) {
                console.error('Houve um problema com a requisição:', error); // Captura e exibe erros
            }
        };

        fetchPosts(); // Chama a função para buscar os posts
    }, []); // O array vazio significa que isso será executado apenas uma vez quando o componente for montado

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li> // Renderiza cada post em uma lista
                ))}
            </ul>
        </div>
    );
};

export default PostsComponent;
