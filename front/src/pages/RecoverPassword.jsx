import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { clientAxios } from "../config/clientAxios";
import Alert from '../components/Alert';

import './recoverPassword.css'

const RecoverPassword = () => {

  const [alert, setAlert] = useState({});
  const [tokenChecked, setTokenChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);

  const { token } = useParams()
  const navigate = useNavigate();

  const handleAlertDisplay = (msg) => 
  {
    setAlert({ msg });
    setTimeout(() => { setAlert({}) }, 3000);
  }

  useEffect(() => 
  {
    const checkToken = async () => 
    {
      try 
      {
        const { data } = await clientAxios.get(`/auth/reset-password?token=${token}`);
        setTokenChecked(true)
      } 
      catch (error) 
      {
        console.log(error.response);
        handleAlertDisplay("Error: " + error.response?.data.msg)
      }
    }

    checkToken();
  }, []);

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
   
    if(!password) 
    {
      handleAlertDisplay('El password es requerido')
      return null
    }

    try 
    {
      const { data } = await clientAxios.post(`/auth/changePassword?token=${token}`, { password });
      handleAlertDisplay('¡Contraseña cambiada! Redireccionando...')
      setTimeout(() => navigate('/'), 5000);
    } 
    catch (error) 
    {
      console.error(error)
      handleAlertDisplay(error.response?.data.msg)
      setPassword("");
    }
  }

  const bgImg = 'https://www.wallpaperflare.com/static/44/337/112/yoshida-hiroshi-artwork-japanese-painting-wallpaper.jpg';
  document.body.style = "background: url('" + bgImg + "'); background-color: var(--c_dark); background-blend-mode: multiply; background-size: cover; background-attachment: fixed;";

  return (
    <section className="recoverPassword">
        <h1>Reestablecer contraseña</h1>

        <form action="" onSubmit={handleSubmit} className='form'>
            <div className='fieldDiv'>
                <label htmlFor="password">Nueva contraseña</label>
                <input id="password" type="password" placeholder="Nueva contraseña" 
                name="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <button type="submit">Reestablecer</button>

            {alert.msg && (
            <div className="infoContainer">
              <Alert {...alert} />

              <div className="bottomLinks">
                <Link to="/">¿Ya tienes una cuenta? Inicia sesión</Link>
                <Link to={'/register'}> ¿Problemas? Intenta volver a registrate</Link>
              </div>
            </div>
            )}
        </form>
    </section>
  )
}

export default RecoverPassword