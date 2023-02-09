import React, { useEffect, useState } from 'react'
import { clientAxios } from '../config/clientAxios';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => 
    {
        const authUser = async() =>
        {
            const token = sessionStorage.getItem('token');
            if(!token)
            {
                setLoading(false);
                return null;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            }

            try
            {
                const { data } = await clientAxios.get('/users/', config);
                console.log( {aMessage: 'user has been auth (req)', ...data} );
                setAuth(data.data);
            }
            catch(error)
            {
                console.error();
                sessionStorage.removeItem('token');
            }
            finally
            {
                setLoading(false);
            }
        }

        authUser();
    }, [])


    return (
        <AuthContext.Provider value={ { auth, setAuth, loading } }>
            { children }
        </AuthContext.Provider>
    )
}

export { AuthProvider }