import React, { useEffect, useState } from 'react';

const PostsComponent = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    const apiUrl = `${process.env.REACT_APP_API_URL}/posts.php`;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(apiUrl, { method: 'GET', credentials: 'include' });
                if (!response.ok) throw new Error('Erro na resposta da rede: ' + response.statusText);
                const data = await response.json();
                console.log('Dados recebidos:', data); // Debug dos dados
                setPosts(data);
            } catch (error) {
                console.error('Erro na requisição:', error);
                setError('Erro ao carregar postagens.');
            }
        };

        fetchPosts();
    }, [apiUrl]);

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Postagens</h1>
            {posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.description}</p>
                            {post.image && <img src={post.image} alt={post.title} />}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Carregando postagens...</p>
            )}
        </div>
    );
};

export default PostsComponent;
