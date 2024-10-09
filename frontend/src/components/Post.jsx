import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Post = () => {
    const { id } = useParams();  // Pega o ID do post da URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/get_post.php`, {
                    params: { id },
                    withCredentials: true, // Certifique-se de que isso está habilitado
                });
        
                if (response.data.error) {
                    throw new Error(response.data.error);
                }
        
                setPost(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };        
        fetchPost();
    }, [id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    if (!post) {
        return <div>Post não encontrado</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.description}</p>

            {post.images && post.images.length > 0 && (
                <div className="post-images">
                    {post.images.map((img, index) => (
                        <img 
                            key={index} 
                            src={img} 
                            alt={`Imagem ${index + 1} do post`}
                            style={{ width: '100%', marginBottom: '10px' }} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Post;
