import React, { useEffect, useState } from 'react';
import Post from './Post'; // Certifique-se de que o caminho está correto
import '../styles/Post.css';

const PostsComponent = () => {
    const [posts, setPosts] = useState([]);
    const apiUrl = 'http://localhost:8082/www/4SM/pj2/pj2/backend/routes/routes.php';

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Houve um problema com a requisição:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            {posts.length > 0 ? (
                posts.map(post => (
                    <Post key={post.id} post={post} /> // Renderiza o componente Post para cada post
                ))
            ) : (
                <p>Nenhum post encontrado.</p>
            )}
        </div>
    );
};

export default PostsComponent;
