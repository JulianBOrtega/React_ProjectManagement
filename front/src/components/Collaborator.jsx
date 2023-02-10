import React from 'react'

import './collaborator.css'
import rejectIcon from '../assets/reject.png'
import placeholder from '../assets/placeholder.gif'

const Collaborator = () => {
  return (
    <div className='collabComponent'>
        <img src={placeholder} alt="pfp" className='collabPfp' />
        <p>Nombre</p>
        <img src={rejectIcon} alt="remove-icon" className='removeIcon' />
    </div>
  )
}

export default Collaborator