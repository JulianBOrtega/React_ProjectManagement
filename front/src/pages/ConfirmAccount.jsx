import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { clientAxios } from "../config/clientAxios";
import Alert from '../components/Alert';

import './confirmAccount.css'

const ConfirmAccount = () => {

  const params = useParams();
  const { token } = params;
  
  const [alert, setAlert] = useState({});
  const navigate = useNavigate()

  function handleAlertDisplay(msg)
  {
    setAlert({ msg });
  }

  useEffect(() => {
    const confirmAccount = async () => 
    {
      try 
      {
        const url = `/auth/checked?token=${token}`;
        const { data } = await clientAxios.get(url);

        handleAlertDisplay('¡Registro completado con éxito! A continuación será redireccionado.');
        setTimeout(() => navigate('/'), 5000);
      } 
      catch (error) 
      {
        console.error(error.response);
        handleAlertDisplay("Error: " + error.response.data.msg);
      }
    }
      confirmAccount();
  }, []);
  
  const bgImg = 'https://img.freepik.com/premium-photo/powerful-tsunami-waves-painting-japanese-style_743855-235.jpg';
  document.body.style = "background: url('" + bgImg + "'); background-color: var(--c_dark); background-blend-mode: multiply; background-size: cover; background-attachment: fixed;";

  return (
    <section className="confirmAccount">
        <h1>Confirmación de tu cuenta</h1>

        {alert.msg && (
          <div className="infoContainer">
            <Alert {...alert} />

            <div className="bottomLinks">
              <Link to="/">¿Ya tienes una cuenta? Inicia sesión</Link>
              <Link to={'/register'}> ¿Problemas? Intenta volver a registrate</Link>
            </div>
          </div>
        )}
    </section>
  )
}

export default ConfirmAccount