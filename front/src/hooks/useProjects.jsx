import React, { useContext } from 'react'
import { ProjectContext } from '../context/ProjectContext'

const useProjects = () => {
  return useContext(ProjectContext)
}

export default useProjects