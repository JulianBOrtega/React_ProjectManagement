import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import { AuthProvider } from './context/AuthProvider'
import ConfirmAccount from './pages/ConfirmAccount'
import ForgetPassword from './pages/ForgetPassword'
import Login from './pages/Login'
import RecoverPassword from './pages/RecoverPassword'
import ProjectAdd from './pages/ProjectAdd'
import ProjectEdit from './pages/ProjectEdit'
import Project from './pages/Project'
import Register from './pages/Register'
import ProtectedLayout from './layouts/ProyectedLayout'
import Projects from './pages/Projects'
import { ProjectProvider } from './context/ProjectProvider'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <Routes>
            {/* Public routes */}
            <Route path='/' element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path='register' element={<Register/>}/>
              <Route path='forgetPassword' element={<ForgetPassword/>}/>
              <Route path='recoverPassword/:token' element={<RecoverPassword/>}/>
              <Route path='confirm/:token' element={<ConfirmAccount/>}/>
              <Route path='*' element={<h1>404 Not Found</h1>}/>
            </Route>
            
            {/* Protected routes */}
            <Route path='/projects' element={<ProtectedLayout/>}>
              <Route index element={<Projects/>}/>
              <Route path="createProject" element={<ProjectAdd />} />
              <Route path="editProject/:id" element={<ProjectEdit />} />
              <Route path=":id" element={<Project/>}/>
            </Route>
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App