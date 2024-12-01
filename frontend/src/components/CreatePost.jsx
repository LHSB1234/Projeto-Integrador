
// frontend/src/components/CreatePost.jsx

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreatePost.css';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

/**
 * Component to create a new post
 *
 * @param {function} onClose Function executed when the component is closed
 * @param {function} onCreatePost Function executed when the post is successfully created
 * @returns {React.ReactElement} The CreatePost component
 */
const CreatePost = ({ onClose, onCreatePost }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axiosInstance.post('/create_post.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.error) {
        alert(response.data.error);
      } else {
        onCreatePost?.(response.data);
        onClose();
      }
    } catch (error) {
      alert('An error occurred while creating the post.');
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
        <h2>Create Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
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
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <button type="button" className="cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;