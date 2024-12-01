// App.test.jsx
import React from 'react';
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App";

test("Renderiza a página inicial por padrão", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/bem-vindo ao blog/i)).toBeInTheDocument();
});

test("Navega para a página de login", () => {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByPlaceholderText(/telefone/i)).toBeInTheDocument();
});

test("Navega para a página de registro", () => {
  render(
    <MemoryRouter initialEntries={["/register"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByPlaceholderText(/telefone/i)).toBeInTheDocument();
});
