import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, tags, popularPosts, closeSidebar }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={closeSidebar}>X</button>
      <div className="sidebar-section">
        <h3>Menu</h3>
        <ul>
          {/* Chamando closeSidebar ao clicar nos links */}
          <li>
            <Link to="/blog" onClick={closeSidebar}>Blog</Link>
          </li>
          <li>
            <Link to="/postpopular" onClick={closeSidebar}>Poste Popular</Link>
          </li>
        </ul>
      </div>
      <hr></hr>
      <div className="sidebar-section">
        <h3>Tags</h3>
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>#{tag}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
