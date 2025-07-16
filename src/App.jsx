import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function App() {

  return (
    <div className="container">
      <h1 className="text-center mt-5"><strong>Sistema de gestión de pasantías</strong></h1>
      <div className="d-grid gap-2 mt-4">
        <Button size="lg" as={Link} to={"/crear-pasantia"}>Registrar pasantía</Button>
        <Button size="lg" as={Link} to={"/crear-alumno"}>Registrar alumno</Button>
        <Button size="lg" as={Link} to={"/crear-empresa"}>Registrar empresa</Button>
      </div>
    </div>
  )
}
