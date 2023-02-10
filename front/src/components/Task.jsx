import React from 'react'

import './task.css'
import doneIcon from '../assets/done.png'
import editIcon from '../assets/edit.png'
import deleteIcon from '../assets/delete.png'
import placeholder from '../assets/placeholder.gif'

const Task = () => {
  return (
    <div className='taskComponent'>
        <div className='infoContainer'>
            <img src={placeholder} alt="task-img" />
            <div className='info'>
                <p><b>Nombre de la tarea</b></p>
                <p>Fecha de entrega</p>
                <p>Prioridad</p>
            </div>
        </div>

        <div className='buttonContainer'>
            <div onClick={null}>
                <img src={editIcon} alt="icon" />
            </div>
            <div onClick={null}>
                <img src={deleteIcon} alt="icon" />
            </div>
            <div onClick={null}>
                <img src={doneIcon} alt="icon" />
            </div>
        </div>
    </div>
    )
}

export default Task