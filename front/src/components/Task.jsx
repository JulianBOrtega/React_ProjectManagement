import React from 'react'

import './task.css'

const Task = () => {
  return (
    <div>
        <div>
            <p>Nombre de la tarea</p>
            <p>Descripción de la tarea</p>
            <p>Fecha de entrega</p>
            <p>Prioridad</p>
        </div>

        <div>
            <button /* onClick="{}" */>
            Editar
            </button>

            <button>Completa/Incompleta</button>
            
            <button /* onClick="{}" */>
            Eliminar
            </button>
        </div>
    </div>
    )
}

export default Task