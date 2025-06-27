import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function CrearAlumno() {

    return (
        <div className="container">
            <div className="mt-5">
                <Button as={Link} to={"/"}>Volver</Button>
                <h1 className="text-center"><strong>Crear alumno</strong></h1>
            </div>
        </div>
    )
}