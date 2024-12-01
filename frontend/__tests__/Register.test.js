// Register.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../src/pages/Register";
import axios from 'axios';

// Mock de axios
jest.mock('axios');

test("Renderiza o formulário de registro", () => {
  render(<Register />);

  expect(screen.getByPlaceholderText(/nome/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/telefone/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
  expect(screen.getByText(/registrar/i)).toBeInTheDocument();
});

test("Simula o registro de um usuário", async () => {
  axios.post.mockResolvedValueOnce({ data: { success: true } });

  render(<Register />);

  fireEvent.change(screen.getByPlaceholderText(/nome/i), { target: { value: "Test User" } });
  fireEvent.change(screen.getByPlaceholderText(/telefone/i), { target: { value: "999999999" } });
  fireEvent.change(screen.getByPlaceholderText(/senha/i), { target: { value: "123456" } });

  fireEvent.click(screen.getByText(/registrar/i));

  await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

  expect(screen.getByText(/usuário registrado com sucesso/i)).toBeInTheDocument();
});
