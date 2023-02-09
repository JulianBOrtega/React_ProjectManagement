import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import { clientAxios } from '../config/clientAxios'
import useAuth from '../hooks/useAuth'
import { useForm } from '../hooks/useForm'

import './login.css'

const Login = () => {

    const [alert, setAlert] = useState({});
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    function handleAlertDisplay(msg, time = true)
    {
        setAlert({ msg });
        if(time) setTimeout(() => { setAlert({})}, 3000);
    }

    const { formValues, setFormValues, handleInputChange, reset } = useForm({
        email: '',
        password: '',
    })

    useEffect(() =>
    {
        function autoLogin()
        {
            if(auth && auth._id) 
            {
                navigate('/projects')
            }
        }

        autoLogin();
    }, [])

    const { email, password } = formValues;
    const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}/;

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        if([email, password].includes('')) 
        {
            handleAlertDisplay('Todos los campos son obligatorios');
            return null;
        }

        if(!exRegEmail.test(email))
        {
            handleAlertDisplay('El email no tiene un formato válido');
            return null;
        }

        try 
        {
            const { data } = await clientAxios.post('/auth/login/', { email, password });
            setAuth(data.data.user);
            sessionStorage.setItem('token', data.data.token)
            navigate('/projects')
        } 
        catch (error) 
        {
            console.error(error);
            handleAlertDisplay('Error: ' + error.response?.data.msg)
        }

    }

    const bgImg = 'https://c4.wallpaperflare.com/wallpaper/1016/709/172/sea-asia-waves-artwork-japanese-art-hd-wallpaper-preview.jpg';
    document.body.style = "background: url('" + bgImg + "'); background-color: var(--c_dark); background-blend-mode: multiply; background-size: cover; background-attachment: fixed;";

    return (
        <section className="login">
            <h1>Inicia sesión</h1>
        
            <form action="" className="form" onSubmit={ handleSubmit }>
                <div className="fieldDiv">
                    <label htmlFor="email">Correo electrónico</label>
                    <input id="email" type="email" placeholder="Email"
                    value={email} name="email" onChange={handleInputChange}/>
                </div>

                <div className="fieldDiv">
                    <label htmlFor="password">Contraseña</label>
                    <input id="password" type="password" placeholder="Contraseña"
                    value={password} name="password" onChange={handleInputChange} />
                </div>

                <button type="submit">Iniciar sesión</button>

                {
                    alert.msg && <Alert { ...alert }/>
                }
            </form>

            <div className="bottomLinks">
                <Link to={'/register'}> ¿No tienes una cuenta? Registrate</Link>
                <Link to={'/forgetPassword'}> Olvidé mi contraseña</Link>
            </div>
        </section>
    )
}

export default Login