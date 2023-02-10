import React, { useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import useProjects from '../hooks/useProjects';
import Task from '../components/Task';
import Collaborator from '../components/Collaborator';

import './project.css'
import placeholder from '../assets/placeholder.gif'
import addIcon from '../assets/add.png';
import editIcon from '../assets/edit.png';
import deleteIcon from '../assets/delete.png';

const Project = () => {

    const { id } = useParams();
    const { loading, getProject, project } = useProjects();

    useEffect(() => 
    {
        getProject(id);
    }, [id])

    const handleAddTask = () =>
    {

    }

    const handleAddCollab = () =>
    {

    }

    const bgImg = 'https://media.istockphoto.com/id/1306441450/photo/underwater-light.jpg?s=612x612&w=0&k=20&c=g7DThntgh5Bx7uSvdDVI3Cxv-08fKmc9Mzc_ZzO5Q8k=';
  document.body.style = "background: url('" + bgImg + "'); background-color: var(--c_dark); background-blend-mode: multiply; background-size: cover; background-attachment: fixed;";

    return (
        <>
            {
                loading ? <p>Cargando...</p>
                : (
                    <div className='projectPage'>
                        <section className='project'>
                            <div className='sectionTitle'>
                                <img src={placeholder} alt="project-img" id='projectImg' />
                                <h1>{ project.name }</h1>
                                <Link to={`/projects/editProject/${id}`} className='img-button' >
                                    <img src={editIcon} alt="edit-pic" />
                                </Link>
                            </div>
                            <hr />
                        </section>

                        <section>
                            <div className='sectionTitle'>
                                <h2> Tareas del proyecto</h2>
                                <div onClick={handleAddTask} className='img-button'>
                                    <img src={addIcon} alt="newTask-pic" />
                                </div>
                            </div>

                            <div className='list'>
                                { [1, 2].map((task) => <Task key={ task } { ...task }/>) }
                            </div>
                        </section>
                    

                        <section>
                            <div className='sectionTitle'>
                                <h2>Colaboradores</h2>
                                <div onClick={handleAddCollab} className='img-button'>
                                    <img src={addIcon} alt="addCollab-pic" />
                                </div>
                            </div>

                            <div className='list'>
                                { [1, 2].map((collab) => <Collaborator key={ collab } { ...collab }/>) }
                            </div>
                        </section>
                </div>
                )   
            }
        </>
    )
}

export default Project