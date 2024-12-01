// Login.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../src/pages/Login";
import axios from 'axios';

// Mock de axios para interceptar as requisições
jest.mock('axios');

test("Renderiza os campos de login", () => {
  render(<Login />);

  expect(screen.getByPlaceholderText(/telefone/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
  expect(screen.getByText(/entrar/i)).toBeInTheDocument();
});

test("Simula um login", async () => {
  const mockLogin = jest.fn();
  axios.post.mockResolvedValueOnce({ data: { success: true, username: "Test User" } });

  render(<Login onLogin={mockLogin} />);

  fireEvent.change(screen.getByPlaceholderText(/telefone/i), {
    target: { value: "999999999" },
  });

  fireEvent.change(screen.getByPlaceholderText(/senha/i), {
    target: { value: "123456" },
  });

  fireEvent.click(screen.getByText(/entrar/i));

  await waitFor(() => expect(mockLogin).toHaveBeenCalledWith("Test User"));
  expect(mockLogin).toHaveBeenCalledTimes(1);
});
