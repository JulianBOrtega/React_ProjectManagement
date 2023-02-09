import React, { useEffect } from 'react'
import FormProject from '../components/FormProject';

import './projectEdit.css'
import placeholder from '../assets/placeholder.gif'
import { useParams } from 'react-router-dom';
import useProjects from '../hooks/useProjects';

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

    return (
        <>
            {
                loading ? <p>Cargando...</p>
                : (
                    <div>
                        <div>
                            <h1>Editar proyecto: {project.name}</h1>
                            <div>
                            <img src={placeholder} alt="delete-pic" />
                                <button onClick={handleDelete}>Eliminar</button>
                            </div>
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