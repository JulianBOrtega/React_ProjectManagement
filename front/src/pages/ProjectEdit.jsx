import React, { useEffect } from 'react'
import FormProject from '../components/FormProject';
import { useParams } from 'react-router-dom';
import useProjects from '../hooks/useProjects';

import './projectEdit.css'
import deleteIcon from '../assets/delete.png';

const ProjectEdit = () => {
    const { id } = useParams();
    const { loading, alert, getProject, project, deleteProject } = useProjects();

    useEffect(() => 
    {
        getProject(id);
    }, [id])

    const handleDelete = () =>
    {
        const confirmDelete = confirm('¿Estás seguro?');

        if(confirmDelete) deleteProject(id);
    }

    const bgImg = 'https://media.istockphoto.com/id/1212803678/photo/underwater-near-ocean-surface-with-rising-bubbles-in-blue-sea-abstract-background-texture.jpg?s=612x612&w=0&k=20&c=q02tXp219BVY4FPXc2Faeel-IsnYgZrSAX9AdEGKVP8=';
    document.body.style = "background: url('" + bgImg + "'); background-color: var(--c_dark); background-blend-mode: multiply; background-size: cover; background-attachment: fixed;";

    return (
        <>
            {
                loading ? <p>Cargando...</p>
                : (
                    <div className='projectEdit'>
                        <div className='titleContainer'>
                            <h1>Editar proyecto: {project.name}</h1>
                            <button onClick={handleDelete}>
                                <img src={deleteIcon} alt="delete-icon" />
                            </button>
                        </div>
                        <div>
                            <FormProject { ...{ id, project } }/>
                        </div>
                </div>
                )
            }
        </>
    );
}

export default ProjectEdit