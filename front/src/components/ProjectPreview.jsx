import React from 'react'
import { Link } from "react-router-dom";
import placeholder from '../assets/placeholder.gif'
import useProjects from '../hooks/useProjects';

import './projectPreview.css'
import deleteIcon from '../assets/delete.png'
import editIcon from '../assets/edit.png'

const ProjectPreview = ({ name, _id, description, expireDate, client }) => {

  const { deleteProject } = useProjects();

  const handleDelete = () =>
  {
      const confirmDelete = confirm('¿Estás seguro?');

      if(confirmDelete) deleteProject(_id);
  }

  return (
        <div className='projectPreview'>
          <div className='hoverButtons'>
            <Link to={`editProject/${_id}`} className='normalizingButton'> <img src={editIcon} alt="edit-button" onClick={null} /> </Link>
            <button onClick={handleDelete} className='normalizingButton'> <img src={deleteIcon} alt="delete-button" onClick={null} /> </button>
            
            
          </div>
          <div className='project'>
            <img src={placeholder} alt={`project-${name}-img`} className='projectImg' />
            <div className='infoContainer'>
              <div className='titleSection'>
                <Link to={`/projects/${_id}`}>{name}</Link>
                <div className='members' onClick={null}>
                  <img src={placeholder} title='collaborator username' alt="member-name-img" />
                  <img src={placeholder} title='collaborator username' alt="member-name-img" />
                  <img src={placeholder} title='collaborator username' alt="member-name-img" />
                </div>
              </div>

              <Link to={`/projects/${_id}`} className='detailsSection'>
                <div className='smallText'>
                  <small>Due <b>{expireDate?.split('T')[0]}</b></small>
                  <small>A project for <b>{client}</b></small>
                </div>
                <p className='description'>{description}</p>
              </Link>
            </div>
          </div>
        </div>
  )
}

export default ProjectPreview