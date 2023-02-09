import React from 'react'
import { Link } from "react-router-dom";
import useAuth from '../hooks/useAuth';

import './sidebar.css'

const Sidebar = () => {
  const { auth } = useAuth();
  const name = auth.name[0].toUpperCase() + auth.name.substring(1);

  return (
    <aside>
        <p>Hola { name }</p>
        <Link to="createProject">Nuevo proyecto</Link>
    </aside>
  )
}

export default Sidebar