import React, { useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import Alert from '../components/Alert';
import useProjects from '../hooks/useProjects';

import './project.css'
import placeholder from '../assets/placeholder.gif'
import Task from '../components/Task';
import Collaborator from '../components/Collaborator';

const Project = () => {

    const { id } = useParams();
    const { loading, alert, getProject, project } = useProjects();

    useEffect(() => 
    {
        getProject(id);
    }, [id])

    if(alert.msg) return <Alert {...alert} />

    const handleAddTask = () =>
    {

    }

    const handleAddCollab = () =>
    {

    }

    return (
        <>
            {
                loading ? <p>Cargando...</p>
                : (
                    <div>
                        <div>
                            <h1>{ project.name }</h1>
                            <Link
                            to={`/projects/editProject/${id}`} 
                            >
                                <img src={placeholder} alt="edit-pic" />
                                <p>Editar</p>
                            </Link>
                        </div>

                        <div>
                            <p>Tareas del proyecto</p>
                            <div onClick={handleAddTask}>
                                <img src={placeholder} alt="newTask-pic" />
                                <p>Nueva Tarea</p>
                            </div>
                        </div>
                    
                        <div>
                            { [1, 2].map((task) => <Task key={ task } { ...task }/>) }
                        </div>

                        <div>
                            <p>Colaboradores</p>
                            <button onClick={handleAddCollab}>
                                <img src={placeholder} alt="addCollab-pic" />
                                <p>Agregar Colaborador</p>
                            </button>
                        </div>

                        <div>
                            { [1, 2].map((collab) => <Collaborator key={ collab } { ...collab }/>) }
                        </div>
                </div>
                )   
            }
        </>
    )
}

export default Project