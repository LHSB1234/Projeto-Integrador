// CreatePost.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import CreatePost from './CreatePost';

describe('CreatePost component', () => {
  let axiosInstance;
  let mockOnClose;
  let mockOnCreatePost;

  beforeEach(() => {
    // Configurar o axiosInstance com um mock
    axiosInstance = {
      post: jest.fn(),
    };

    // Mockar as funções de callback
    mockOnClose = jest.fn();
    mockOnCreatePost = jest.fn();

    // Configurar o global.fetch para o axiosInstance
    global.fetch = jest.fn().mockResolvedValue({
      data: { success: true },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create a new post successfully', async () => {
    render(<CreatePost onClose={mockOnClose} onCreatePost={mockOnCreatePost} />);

    const titleInput = screen.getByPlaceholderText('Title');
    const descriptionTextarea = screen.getByPlaceholderText('Description');
    const fileInput = screen.getByLabelText('File');

    // Simular o preenchimento do formulário
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(descriptionTextarea, { target: { value: 'Test Description' } });

    // Simular o upload de um arquivo (não é possível em ambiente de teste)
    // Para simulação, usaremos uma string vazia
    fireEvent.change(fileInput, { target: { files: [{ name: 'test.jpg', type: 'image/jpeg' }] } });

    // Simular o envio do formulário
    await fireEvent.click(screen.getByText('Submit'));

    expect(axiosInstance.post).toHaveBeenCalledWith('/create_post.php', {
      title: 'Test Title',
      description: 'Test Description',
      image: 'test.jpg',
    }, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    expect(mockOnCreatePost).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('should handle errors when creating a post', async () => {
    axiosInstance.post.mockRejectedValue(new Error('Failed to create post'));

    render(<CreatePost onClose={mockOnClose} onCreatePost={mockOnCreatePost} />);

    const titleInput = screen.getByPlaceholderText('Title');
    const descriptionTextarea = screen.getByPlaceholderText('Description');
    const fileInput = screen.getByLabelText('File');

    fireEvent.change(titleInput, { target: { value: 'Error Test Title' } });
    fireEvent.change(descriptionTextarea, { target: { value: 'Error Test Description' } });

    fireEvent.change(fileInput, { target: { files: [{ name: 'error_test.jpg', type: 'image/jpeg' }] } });

    await fireEvent.click(screen.getByText('Submit'));

    expect(axiosInstance.post).toHaveBeenCalledWith('/create_post.php', {
      title: 'Error Test Title',
      description: 'Error Test Description',
      image: 'error_test.jpg',
    }, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    expect(alert).toHaveBeenCalledWith('An error occurred while creating the post.');
  });
});
