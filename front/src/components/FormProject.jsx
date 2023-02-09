import React from 'react'
import { useForm } from '../hooks/useForm'
import useProjects from '../hooks/useProjects'
import Alert from './Alert'

import './formProject.css'

const FormProject = ({ id, project }) => {

    const { alert, handleAlertDisplay, storeProject } = useProjects();

    const { formValues, handleInputChange, reset} = useForm({
        name: project?.name || '',
        description: project?.description || '',
        expireDate: project?.expireDate || '',
        client: project?.client || ''
    })

    const { name, description, expireDate, client } = formValues;

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        if([name, description, expireDate, client].includes('') || [name, description, expireDate, client].includes(undefined)) 
        {
            handleAlertDisplay('Todos los campos son obligatorios');
            return null;
        }
        
        storeProject({ id, name, description, expireDate, client })
        
        reset();
    }

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">
            Nombre Proyecto
            </label>
            <input id="name" type="text" placeholder="Nombre del proyecto" 
            name="name" value={name} onChange={handleInputChange}/>
        </div>

        <div>
            <label htmlFor="description">
            Descripción
            </label>
            <textarea
            id="description"
            type="text"
            style={{resize: "none"}}
            placeholder="Descripción del proyecto"
            name="description" value={description} onChange={handleInputChange}
            ></textarea>
        </div>

        <div>
            <label htmlFor="date-expire">
            Fecha de entrega
            </label>
            <input id="expireDate" type="date" 
            name="expireDate" value={expireDate?.split('T')[0]} onChange={handleInputChange}/>
        </div>

        <div>
            <label htmlFor="client">
            Nombre Cliente
            </label>
            <input id="client" type="text" placeholder="Nombre del cliente" 
            name="client" value={client} onChange={handleInputChange}/>
        </div>
        
        <button>
            actualizar/guardar
        </button>

        {
            alert.msg && <Alert { ...alert }/>
        }
    </form>
  )
}

export default FormProject