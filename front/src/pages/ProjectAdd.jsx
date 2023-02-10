import React from 'react'
import FormProject from '../components/FormProject'

import './projectAdd.css'

const ProjectAdd = () => {

  const bgImg = 'https://media.istockphoto.com/id/1212803678/photo/underwater-near-ocean-surface-with-rising-bubbles-in-blue-sea-abstract-background-texture.jpg?s=612x612&w=0&k=20&c=q02tXp219BVY4FPXc2Faeel-IsnYgZrSAX9AdEGKVP8=';
  document.body.style = "background: url('" + bgImg + "'); background-color: var(--c_dark); background-blend-mode: multiply; background-size: cover; background-attachment: fixed;";
    
  return (
    <div className='projectAdd'>
        <h1>Crear proyecto</h1>
        <div>
            <FormProject/>
        </div>
    </div>
  )
}

export default ProjectAdd