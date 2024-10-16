import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/Login.css";

function Login({ onLogin }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login.php`, {
        phone,
        password,
      }, {
        withCredentials: true, // Adicione isso aqui
      });

      // Exibe a resposta no console para depuração
      console.log(response.data);

      if (response.data.success) {
        onLogin(response.data.username);  // Passa o nome do usuário para o App
        navigate('/blog');  // Redireciona para a blog após login bem-sucedido
      } else {
        setErrorMessage('Falha ao autenticar. Verifique seu telefone e senha.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Erro no servidor. Tente novamente mais tarde.');
    }
  };

  return (
    <div class="login-container">
      <h2>Login</h2>
      <form class="login-form" onSubmit={handleLogin}>
        <div>
          <label>Telefone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Entrar</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div class="forgot-password">
        <a href="/forgot-password">Esqueci minha senha</a>
      </div>
     
    </div>
  );
}

export default Login;
