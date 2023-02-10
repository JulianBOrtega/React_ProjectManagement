import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { clientAxios } from "../config/clientAxios";
import Alert from '../components/Alert';

import './forgetPassword.css'

const ForgetPassword = () => {

    const [email, setEmail] = useState("");
    const [alert, setAlert] = useState({});

    const handleSubmit = async (e) => 
    {
        e.preventDefault();

        if(!email)
        {
            handleAlertDisplay("El email es obligatorio")
            return null
        }

        try 
        {
            const {data} = await clientAxios.post(`${import.meta.env.VITE_URL_BACKEND}/auth/sendToken`, { email });
            handleAlertDisplay("¡Recibido! Revisa tu correo electrónico.")
            setEmail("")
        } 
        catch (error) 
        {
            console.error(error);
            handleAlertDisplay("Error: " + error.response.data.msg);
            setEmail("")
        }           
    }
        
    const handleAlertDisplay = (msg) => 
    {
        setAlert({ msg });
        setTimeout(() => { setAlert({}) }, 3000);
    }

    const bgImg = 'https://www.wallpaperflare.com/static/44/337/112/yoshida-hiroshi-artwork-japanese-painting-wallpaper.jpg';
    document.body.style = "background: url('" + bgImg + "'); background-color: var(--c_dark); background-blend-mode: multiply; background-size: cover; background-attachment: fixed;";

    return (
      <section className="forgetPassword">
          <h1>Recupera tu contraseña</h1>

          <form action="" className="form" onSubmit={handleSubmit}>
              <div className="fieldDiv">
                  <label htmlFor="email">Correo electrónico</label>
                  <input id="email" type="email" placeholder="email"  name="email"
                  value={ email } onChange={(e) => setEmail(e.target.value)}/>
              </div>

              <button type="submit">Recuperar contraseña</button>
              { alert.msg && <Alert {...alert} />}
          </form>

          <div className="bottomLinks">
              <Link to={'/register'}> ¿No tienes una cuenta? Registrate</Link>
              <Link to="/">¿Ya tienes una cuenta? Inicia sesión</Link>
          </div>
      </section>
    )
}

export default ForgetPassword