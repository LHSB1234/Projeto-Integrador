import React from 'react';

function Post({ post }) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            {post.images && post.images.length > 0 && (
            <div>
                {post.images.map((imageUrl, index) => (
                    <div key={index}>
                        <img 
                            src={imageUrl} 
                            alt={`Imagem ${index + 1}`} 
                            style={{ maxWidth: '100%', height: 'auto' }} 
                        />
                    </div>
                ))}
            </div>
            )}
        </div>
    );
}

export default Post;
