import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes, useNavigate, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import PostPopular from './pages/PostPopular';
import Blog from './pages/Blog';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import CreatePost from './components/CreatePost';
import './styles/App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthentication = (user) => {
    setIsAuthenticated(true);
    setUsername(user);
    navigate('/blog'); 
  };

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/logout.php`, { method: 'POST' });
      setIsAuthenticated(false);
      setUsername(''); // Limpa o nome de usuário
      navigate('/login'); // Redireciona para a página de login
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/check-auth.php`, { withCredentials: true });
        if (response.data.success) {
          setIsAuthenticated(true);
          setUsername(response.data.username);
        } else {
          setIsAuthenticated(false);
          navigate('/login');
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação", error);
        setIsAuthenticated(false);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate('/register');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/index.php`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {/* Renderiza o Header somente se o usuário estiver autenticado e não estiver nas páginas de login, registro ou recuperação de senha */}
      {isAuthenticated && !['/login', '/register', '/forgot-password'].includes(location.pathname) && (
        <>
          <Header 
            username={username} 
            onLogout={handleLogout} 
            setIsCreatePostOpen={setIsCreatePostOpen} 
          />
          {isCreatePostOpen && (
            <CreatePost onClose={() => setIsCreatePostOpen(false)} /> 
          )}
        </>
      )}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleAuthentication} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route 
          path="/PostPopular" 
          element={isAuthenticated ? <PostPopular username={username} posts={posts} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/blog" 
          element={isAuthenticated ? <Blog posts={posts} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
        />
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>

      {location.pathname === '/blog' && <Footer />}
    </>
  );
}

export default App;
