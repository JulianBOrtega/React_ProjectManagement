import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clientAxios } from '../config/clientAxios';
import { ProjectContext } from './ProjectContext'

export const ProjectProvider = ({ children }) => {
  const [project, setProject] = useState({});
  const [projects, setProjects] = useState({});
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function handleAlertDisplay(msg, time = false)
  {
      setAlert({ msg });
      if(time) setTimeout(() => { setAlert({})}, 3000);
  }

  const getProjects = async () =>
  {
    setLoading(true);
    
    try
    {
      const token = sessionStorage.getItem('token');
      if(!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      }

      const {data} = await clientAxios.get('/projects', config)
      console.log(data)
      setProjects(data.data)
    }
    catch(error)
    {
      console.error(error)
      handleAlertDisplay(error.response ? error.response.data.msg : 'Error de API');
    }
    finally
    {
      setLoading(false);
    }
  }

  const getProject = async (id) =>
  {
    setLoading(true);
    
    try
    {
      const token = sessionStorage.getItem('token');
      if(!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      }

      const { data } = await clientAxios.get(`/projects/${id}`, config)
      setProject(data.data)
    }
    catch(error)
    {
      console.error(error)
      handleAlertDisplay(error.response ? error.response.data.msg : 'Error de API');
    }
    finally
    {
      setLoading(false);
    }
  }

  const storeProject = async (project) =>
  {
    setLoading(true);
    
    try
    {
      const token = sessionStorage.getItem('token');
      console.log('token found in storage: ' + token)
      if(!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      }

      if(project.id)
      {
        const { data } = await clientAxios.put(`/projects/${project.id}`, project, config)
        
        const projectsUpdated = projects.map(projectState => {
          if(projectState._id === data.data._id)
          {
            return data.data;
          }
          return projectState
        })

        const projectPath = '/projects/' + project.id;
        setProjects(projectsUpdated);
        handleAlertDisplay('Proyecto actualizado exitosamente', true)
        setTimeout(() => navigate(projectPath), 3000)
      }
      else
      {
        const { data } = await clientAxios.post(`/projects`, project, config)
        setProjects([...projects, data.data]);

        handleAlertDisplay('Proyecto guardado exitosamente', true)
        setTimeout(() => navigate('/projects'), 3000)
      }

      
    }
    catch(error)
    {
      console.error(error)
      handleAlertDisplay(error.response ? error.response.data.msg : 'Error de API');
    }
    finally
    {
      setLoading(false);
    }
  }

  const deleteProject = async (id) =>
  {
    try
    {
      const token = sessionStorage.getItem('token');
      if(!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      }

      const { data } = await clientAxios.delete(`/projects/${id}`, config)
      const projectsFiltered = projects.filter(project => project._id !== !id)

      handleAlertDisplay('Proyecto eliminado exitosamente', true)
      setTimeout(() => navigate('/projects'), 3000)
      setProjects(projectsFiltered)
    }
    catch(error)
    {
      console.error(error)
      handleAlertDisplay(error.response ? error.response.data.msg : 'Error de API');
    }
  }

  return (
    <ProjectContext.Provider value={{
        loading, projects, project, alert, handleAlertDisplay, getProject, getProjects, storeProject, deleteProject
      }}>
        {children}
    </ProjectContext.Provider>
  )
}