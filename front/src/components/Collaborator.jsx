import React from 'react'

import './collaborator.css'

const Collaborator = () => {
  return (
    <div>
        <p>
            Nombre de colaborador
            <span>|Email</span>
        </p>
        
        <div>
            <button /* onClick="{handleDelete}" */>
            Eliminar
            </button>
        </div>
    </div>
  )
}

export default Collaborator