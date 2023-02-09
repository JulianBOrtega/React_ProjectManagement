import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const AuthLayout = () => {
  return (
    <main>
        <div>
          <Navbar/>
          <Outlet/>
        </div>
    </main>
  )
}

export default AuthLayout