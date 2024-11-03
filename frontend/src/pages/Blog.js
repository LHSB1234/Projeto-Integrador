import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/Post';

function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts.php`);
                console.log('Dados retornados:', response.data); // Verifique a estrutura dos dados
                if (Array.isArray(response.data)) {
                    setPosts(response.data);
                } else {
                    setError('A resposta não é um array.');
                }
            } catch (error) {
                setError('Erro ao buscar posts.');
            } finally {
                setLoading(false);
            }
        }
    
        fetchPosts();
    }, []);

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
