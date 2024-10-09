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
  import CreatePost from './components/CreatePost'; // Importa o componente CreatePost
  import './styles/App.css';

  function App() {
    const [posts, setPosts] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false); // Estado para controlar a visibilidade do modal
    const navigate = useNavigate();
    const location = useLocation(); // Usado para verificar a rota atual

    const handleAuthentication = (user) => {
      setIsAuthenticated(true);
      setUsername(user);
      navigate('/blog');  // Redireciona para a blog após login
    };

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
        {isAuthenticated && (
          <>
            <Header 
              username={username} 
              setIsAuthenticated={setIsAuthenticated} 
              setIsCreatePostOpen={setIsCreatePostOpen} // Passa a função para abrir o modal
            />
            {isCreatePostOpen && (
              <CreatePost onClose={() => setIsCreatePostOpen(false)} /> // Exibe o modal de criação de post
            )}
          </>
        )}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleAuthentication} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/terms" element={<Terms />} />
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

        {/* Exibe o Footer apenas se a rota atual for "/blog" */}
        {location.pathname === '/blog' && <Footer />}
      </>
    );
  }

  export default App;
