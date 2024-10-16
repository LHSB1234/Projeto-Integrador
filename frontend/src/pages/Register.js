import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';  

function Register() {
  const [formData, setFormData] = useState({ name: '', phone: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.name || !formData.phone || !formData.password) {
      setErrorMessage('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/register.php`, formData);

      if (response.data.success) {
        setSuccessMessage('Usuário registrado com sucesso!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);  // Pequeno delay para mostrar a mensagem de sucesso
      } else {
        setErrorMessage(response.data.message || 'Falha no registro. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      setErrorMessage('Erro no servidor. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="login-container">
      <h2>Registro</h2>
      <form class="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Registrar</button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <button class="façalogin" onClick={() => navigate('/login')}>
        Já tem uma conta? Faça login
      </button>
    </div>
  );
}

export default Register;
