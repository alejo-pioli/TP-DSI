import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CrearPasantia from './CrearPasantia.jsx'
import CrearAlumno from './CrearAlumno.jsx'
import CrearEmpresa from './CrearEmpresa.jsx'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/crear-pasantia", element: <CrearPasantia /> },
  { path: "/crear-alumno", element: <CrearAlumno /> },
  { path: "/crear-empresa", element: <CrearEmpresa /> }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)