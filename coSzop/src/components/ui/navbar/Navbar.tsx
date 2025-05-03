import React, { useState } from 'react';
import './Navbar.css'; 

interface NavbarProps {
  links: { text: string; href: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <button className="burger-menu" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href}>{link.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;