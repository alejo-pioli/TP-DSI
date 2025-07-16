import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function CrearPasantia() {

    localStorage.setItem("puestos", JSON.stringify([
        {
            "id": 106,
            "nombre": "Desarrollador Backend Jr.",
            "carrera": "Ingeniería en Sistemas de Información",
            "idEmpresa": 11,
            "empresa": "Global Software Inc"
        },
        {
            "id": 107,
            "nombre": "Asistente de Procesos Químicos",
            "carrera": "Ingeniería Química",
            "idEmpresa": 21,
            "empresa": "ChemSolutions S.A."
        },
        {
            "id": 108,
            "nombre": "Analista de Producción Industrial",
            "carrera": "Ingeniería Industrial",
            "idEmpresa": 22,
            "empresa": "Industrias Nova SRL"
        },
        {
            "id": 109,
            "nombre": "Técnico de Soporte Electrónico",
            "carrera": "Ingeniería Electrónica",
            "idEmpresa": 23,
            "empresa": "ElectroSystems Ltda."
        },
        {
            "id": 110,
            "nombre": "Asistente de Mantenimiento Electromecánico",
            "carrera": "Ingeniería Electromecánica",
            "idEmpresa": 24,
            "empresa": "MecanoTech Corp."
        },
        {
            "id": 111,
            "nombre": "Especialista en Automatización de Procesos",
            "carrera": "Ingeniería Electrónica",
            "idEmpresa": 25,
            "empresa": "Automatix Solutions"
        },
        {
            "id": 112,
            "nombre": "Planificador de Operaciones Industriales",
            "carrera": "Ingeniería Industrial",
            "idEmpresa": 26,
            "empresa": "SmartIndustria Global"
        }
    ]))

    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]
    const [startDate, setStartDate] = useState(todayStr)
    const [endDate, setEndDate] = useState('')

    const handleStartDateChange = (e) => {
        const newStart = e.target.value
        setStartDate(newStart)
        if (endDate && newStart >= endDate) {
            setEndDate('')
        }
    }

    const getMinEndDate = () => {
        const next = new Date(startDate)
        next.setDate(next.getDate() + 1)
        return next.toISOString().split('T')[0]
    }

    const alumnos = JSON.parse(localStorage.getItem("alumnos")) ?? []
    const puestos = JSON.parse(localStorage.getItem("puestos")) ?? []
    console.log(alumnos)

    const pasantias = JSON.parse(localStorage.getItem("pasantias")) ?? []

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return
        }

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        pasantias.push(data)
        console.log(pasantias)

        localStorage.setItem("pasantias", JSON.stringify(pasantias))

        e.target.reset()
    };

    return (
        <div className="container">
            <div className="mt-5">
                <Button as={Link} to={"/"}>Volver</Button>
                <h1 className="text-center"><strong>Registrar pasantía</strong></h1>
            </div>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Group controlId="alumno" className="mb-3">
                    <Form.Label>Alumno</Form.Label>
                    <Form.Select defaultValue="" name="alumno" required>
                        <option value="">Seleccione un alumno</option>
                        {alumnos.map((alumno) =>
                            <option value={alumno.legajo}>{alumno.nombre} {alumno.apellido} ({alumno.carrera})</option>
                        )}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="puesto" className="mb-3">
                    <Form.Label>Puesto</Form.Label>
                    <Form.Select defaultValue="" name="puesto" required>
                        <option value="">Seleccione un puesto</option>
                        {puestos.map((puesto) =>
                            <option value={puesto.id}>{puesto.nombre} ({puesto.carrera} - {puesto.empresa})</option>
                        )}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="fechaInicio" className="mb-3">
                    <Form.Label>Fecha de inicio</Form.Label>
                    <Form.Control
                        name="fechaInicio"
                        type="date"
                        min={todayStr}
                        value={startDate}
                        onChange={handleStartDateChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="fechaFin" className="mb-3">
                    <Form.Label>Fecha de fin</Form.Label>
                    <Form.Control
                        name="fechaFin"
                        type="date"
                        min={getMinEndDate()}
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        disabled={!startDate}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="descripcion" className="mb-3">
                    <Form.Label>Descripción (opcional)</Form.Label>
                    <Form.Control
                        name="descripcion"
                        as="textarea"
                        rows={3}
                        placeholder="Agrega una descripción..."
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>
        </div>
    )
}