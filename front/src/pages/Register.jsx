import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Alert from '../components/Alert';
import { clientAxios } from '../config/clientAxios';
import { useForm } from '../hooks/useForm'

import './register.css'

const Register = () => {

    const [alert, setAlert] = useState({});
    const [sending, setSending] = useState(false);

    const { formValues, setFormValues, handleInputChange, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formValues;
    const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}/;

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        if([name, email, password, password2].includes('')) 
        {
            handleAlertDisplay('Todos los campos son obligatorios');
            return null;
        }

        if(!exRegEmail.test(email))
        {
            handleAlertDisplay('El email no tiene un formato válido');
            return null;
        }

        if(password != password2)
        {
            handleAlertDisplay('Las contraseñas no coinciden');
            return null;
        }

        try 
        {
            setSending(true);
            const dataSend = { name, email, password };
            const dataReceived = await clientAxios.post('/auth/register', dataSend);

            setSending(false);

            if(!dataReceived.data.ok)
            {
                handleAlertDisplay(dataReceived.request.response);
                return null;
            }

            handleAlertDisplay('¡Registrado enviado! Revisa tu email por el correo de confirmación.');
            reset();
        } 
        catch (error) 
        {
            console.error(error)
            handleAlertDisplay(error.response.data.msg);
            setSending(false);
        }
    }

    const handleAlertDisplay = (msg) =>
    {
        setAlert({ msg })

        setTimeout(() =>
        {
            setAlert({})
        }, 5000);
    }

    const bgImg = 'https://img.freepik.com/premium-photo/powerful-tsunami-waves-painting-japanese-style_743855-235.jpg';
    document.body.style = "background: url('" + bgImg + "'); background-color: var(--c_dark); background-blend-mode: multiply; background-size: cover; background-attachment: fixed;";

    return (
        <div className='register'>

            <h1>Registrate</h1>

            {
                alert.msg && <Alert { ...alert }/>
            }

            <form action="" onSubmit={handleSubmit} className="form">
                <div className="fieldDiv">
                    <label htmlFor="name">Nombre</label>
                    <input id="name" type="text" placeholder="Nombre" autoComplete="off" 
                    value={name} name="name" onChange={handleInputChange}/>
                </div>

                <div className="fieldDiv">
                    <label htmlFor="email">Correo electrónico</label>
                    <input id="email" type="email" placeholder="Correo electrónico" 
                    value={email} name="email" onChange={handleInputChange}/>
                </div>

                <div className="fieldDiv">
                    <label htmlFor="password">Contraseña</label>
                    <input id="password" type="password" placeholder="Contraseña"
                    value={password} name="password" onChange={handleInputChange}/>
                </div>

                <div className="fieldDiv">
                    <label htmlFor="password2">Verifica tu contraseña</label>
                    <input id="password2" type="password" placeholder="Repite tu contraseña"
                    value={password2} name="password2" onChange={handleInputChange}/>
                </div>

                <button type="submit" disabled = { sending }>Registrarse</button>
            </form>

            <div>
                <Link to="/">¿Ya tienes una cuenta? Inicia sesión</Link>
            </div>
        </div>
    )
}

export default Register