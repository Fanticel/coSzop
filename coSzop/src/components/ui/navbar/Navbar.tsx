import React, { useContext, useState } from 'react';
import './Navbar.css'; 
import { AuthContext } from '../../../paths/authcontext';


interface NavbarProps {
  links: { text: string; href: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const {user, logout} = useContext(AuthContext)
  // const navigate = useNavigate();

  const handleLogout = () => {
    // navigate(paths.home.getHref());
    logout();

  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <button className="burger-menu" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      <div className='flex flex-row'>
      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href}>{link.text}</a>
          </li>
        ))}
      </ul>
      <a href='/landing'>
      {user!=null?<button onClick={()=>{handleLogout()}} className='bg-red-500 hover:bg-red-700 text-white font-bold h-10 py-2 px-4 ml-3 rounded focus:outline-none focus:shadow-outline' >Logout</button>:<></>}
     </a>
      </div>
    </nav>
  );
};

export default Navbar;