import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaBars, FaPlus } from 'react-icons/fa';
import Sidebar from './SideBar';
import '../styles/Header.css';

const Header = ({ username, onLogout, setIsCreatePostOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Buscando por: ${searchQuery}`);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="header">
        <nav className="navbar">
          <div className="navbar-logo">
            <FaBars
              size={30}
              onClick={toggleSidebar}
              style={{ cursor: 'pointer', color: isSidebarOpen ? '#ff6347' : 'black' }}
            />
          </div>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Buscar</button>
          </form>
          <button className="create-post-button" onClick={() => setIsCreatePostOpen(true)}>
            <FaPlus size={20} /> Criar Post
          </button>
          <div className="navbar-user">
            <Link to="/profile">
              <FaUser size={30} />
            </Link>
            {username && (
              <button className="logout-button" onClick={onLogout}>
                <FaSignOutAlt size={20} /> Sair
              </button>
            )}
          </div>
        </nav>
      </header>

      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar} />
      <Sidebar
        isOpen={isSidebarOpen}
        tags={['React', 'PHP', 'DevOps']}
        popularPosts={['Post 1', 'Post 2', 'Post 3']}
        closeSidebar={toggleSidebar}
      />
    </>
  );
};

export default Header;
