import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreatePost.css';

// Instância do axios com credenciais
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true, // Isso deve ser verdadeiro para enviar cookies/sessões
});

const CreatePost = ({ onClose, onCreatePost }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        try {
            // Certifique-se que a URL base está correta no .env
            const response = await axiosInstance.post('/create_post.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.error) {
                alert(response.data.error);
            } else {
                if (typeof onCreatePost === 'function') {
                    onCreatePost(response.data);
                }
                onClose();
            }
        } catch (error) {
            alert('Ocorreu um erro ao criar o post.');
        } finally {
            setIsSubmitting(false);
            setTitle('');
            setDescription('');
            setImage(null);
        }
    };

    return (
        <div className="create-post-container">
            <div className="create-post-modal">
                <h2>Criar Post</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Título" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                    <input 
                        type="file" 
                        onChange={(e) => setImage(e.target.files[0])} 
                    />
                    <div className="button-container">
                        <button type="submit" className="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Enviando...' : 'Enviar'}
                        </button>
                        <button type="button" className="cancel" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
