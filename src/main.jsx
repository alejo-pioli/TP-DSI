import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CrearPasantia from './CrearPasantia.jsx'
import CrearAlumno from './CrearAlumno.jsx'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/crear-pasantia", element: <CrearPasantia/>},
  { path: "/crear-alumno", element: <CrearAlumno/>}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)