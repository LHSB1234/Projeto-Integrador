import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Meu Blog de Arquitetura, Engenharia Civil e Design de Interiores. Todos os direitos reservados.</p>
        <nav>
          <ul>
            <li><a href="/terms">Termos de Serviço</a></li>
            <li><a href="/privacy">Política de Privacidade</a></li>
            <li><a href="/contact">Contato</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
