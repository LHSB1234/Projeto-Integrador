import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/Post';

function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true; // Controla se o componente ainda está montado
        async function fetchPosts() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts.php`);
                console.log('Dados retornados:', response.data); // Apenas para debug
                if (Array.isArray(response.data) && isMounted) {
                    setPosts(response.data);
                } else if (isMounted) {
                    setError('A resposta não é um array.');
                }
            } catch (error) {
                if (isMounted) {
                    setError('Erro ao buscar posts.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }
        fetchPosts();

        return () => {
            isMounted = false; // Garante que nenhuma atualização ocorra após o componente desmontar
        };
    }, []); // Array vazio garante que o useEffect seja chamado apenas uma vez

    if (loading) {
        return <p>Carregando posts...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!posts || posts.length === 0) {
        return <p>Sem posts disponíveis</p>;
    }

    return (
        <div>
            <h2>Blog</h2>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
}

export default Blog;
