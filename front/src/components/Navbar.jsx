import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

import './navbar.css';
import logo from '../assets/squid.png'

const Navbar = () => {

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () =>
  {
    setAuth({});
    sessionStorage.removeItem('token');
    navigate('/');
  }

  return (
    <nav className='navbar'>
      <Link to={(auth && auth._id) ? '/projects' : '/'} className="nav_logo">
        <img src={logo} alt="logo" />
        <p>Dominance</p>
      </Link>

      <div className='nav_linksContainer'>
        <div className='nav_leftSide'>
          {
            (auth && auth._id) && (
              <>
                <Link className='nav_link' to="/projects">Ver proyectos</Link>
                <Link className='nav_link' to="/projects/createProject">Crear proyecto</Link>
              </>
            ) 
          }
          
        </div>
        
        <div className='nav_rightSide'>
          {
            (auth && auth._id) ? (
              <button className='nav_link' onClick={ handleLogout }>Salir</button>
            ) 
            : (
              <>
                <Link className='nav_link' to="/register">Registrarse</Link>
                <Link className='nav_link' to="/">Acceder</Link>
              </>
            )
          }
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar