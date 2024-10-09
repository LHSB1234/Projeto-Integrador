import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/Post'; // Importar o componente Post
import CreatePost from '../components/CreatePost'; // Importar o componente CreatePost

function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false); // Estado para controle do modal

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts.php`);
                if (Array.isArray(response.data)) {
                    setPosts(response.data);
                } else {
                    setError('A resposta não é um array.');
                }
            } catch (error) {
                if (error.response) {
                    setError(`Erro: ${error.response.status} - ${error.response.data}`);
                } else if (error.request) {
                    setError('Sem resposta do servidor. Tente novamente mais tarde.');
                } else {
                    setError(`Erro: ${error.message}`);
                }
                console.error('Erro ao buscar posts:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    const handleCreatePost = async (newPost) => {
        // Atualiza a lista de posts com o novo post
        setPosts((prevPosts) => [...prevPosts, newPost]);
        setIsCreatePostOpen(false); // Fecha o modal
    };

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
            <button onClick={() => setIsCreatePostOpen(true)}>Criar Post</button> {/* Botão para abrir o modal */}

            {isCreatePostOpen && (
                <CreatePost onClose={() => setIsCreatePostOpen(false)} onCreatePost={handleCreatePost} />
            )}

            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Post post={post} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Blog;
