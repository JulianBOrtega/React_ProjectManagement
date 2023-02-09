import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import useAuth from '../hooks/useAuth'


const ProtectedLayout = () => {

    const { auth, loading } = useAuth();

    if(loading) return <p>Cargando...</p>

    return (

        <>
        {
            (auth && auth._id) ? (
                <main>
                    <div>
                        <Navbar/>
                        <Outlet/>
                    </div>
                </main>
            ) : 
                <Navigate to='/' />
        }
        </>
    )
}

export default ProtectedLayout