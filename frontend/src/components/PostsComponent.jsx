import React, { useEffect, useState } from 'react';

const PostsComponent = () => {
    const [posts, setPosts] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL + '/routes/routes.php';

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Erro na resposta da rede: ' + response.statusText);
                }

                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            {posts.length > 0 ? (
                posts.map(post => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                        {post.images && post.images.map((img, index) => (
                            <img key={index} src={img} alt="Imagem do post" />
                        ))}
                    </div>
                ))
            ) : (
                <p>Nenhum post encontrado.</p>
            )}
        </div>
    );
};

export default PostsComponent;
