import React from 'react';

function Post({ post }) {
    console.log('Dados do post:', post); // Debug para verificar os dados do post

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            {post.images && post.images.length > 0 ? (
                <div>
                    {post.images.map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl}
                            alt={`Imagem ${index + 1}`}
                            style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
                        />
                    ))}
                </div>
            ) : (
                <p>Sem imagens para este post.</p>
            )}
        </div>
    );
}

export default Post;
