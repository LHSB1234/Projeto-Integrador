import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate

function ForgotPassword() {
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate(); // Hook para redirecionar

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/forgot_password.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: telefone }),
      });

      const data = await response.json();

      if (data.success) {
        // Exibir as informações em um alerta
        window.alert(`Nome de Usuário: ${data.username}\nTelefone: ${data.phone}\nSenha: ${data.password}`);
      }   else {
        setMensagem(data.message);
      }
    } catch (error) {
      setMensagem('Erro ao conectar com o servidor.');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <div>
      <h2>Esqueci a Senha</h2>
      <form onSubmit={handleForgotPassword}>
        <div>
          <label>Telefone:</label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>
        <button type="submit">Recuperar Senha</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
      <button onClick={handleBackToLogin}>Voltar ao Login</button> {/* Botão para voltar ao login */}
    </div>
  );
}

export default ForgotPassword;
