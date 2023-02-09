import React, { useEffect } from 'react'
import ProjectPreview from '../components/ProjectPreview'
import useProjects from '../hooks/useProjects'

import './projects.css'

const Projects = () => {

  const {loading, alert, projects, getProjects} = useProjects();

  useEffect(() =>
  {
    getProjects();
  }, [])

  const bgImg = 'https://media.istockphoto.com/id/1306441450/photo/underwater-light.jpg?s=612x612&w=0&k=20&c=g7DThntgh5Bx7uSvdDVI3Cxv-08fKmc9Mzc_ZzO5Q8k=';
  document.body.style = "background: url('" + bgImg + "'); background-color: var(--c_dark); background-blend-mode: multiply; background-size: cover; background-attachment: fixed;";

  return (
    <div className='projectsPage'>
      <div className='projects'>
        <h2>Proyectos</h2>
        <div className='list'>
          {
            loading ? <p>Cargando...</p>
              : projects.length ? projects.map(p => <ProjectPreview key={p._id} {...p}/>)
                : <p>Actualmente no tienes ningún proyecto creado.</p>
          }
        </div>
      </div>

      <div className='dueSoon'>
        <h2>Vence próximamente</h2>
        <div className='list'>
          <br />
          <p>Sin tareas</p>
        </div>
      </div>
    </div>
  )
}

export default Projects