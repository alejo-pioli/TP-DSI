import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function CrearPasantia() {
    localStorage.setItem("alumnos", JSON.stringify([
        {
            "legajo": 10000,
            "nombre": "Juan",
            "apellido": "Pérez",
            "cuil": "20-40000000-7",
            "fecha-nacimiento": "2005-05-24",
            "carrera": "Ingeniería en Sistemas de Información",
            "telefono": 3564400000,
            "email": "juan.perez@example.com",
            "domicilio": "España 2010"
        },
        {
            "legajo": 10001,
            "nombre": "María",
            "apellido": "Gómez",
            "cuil": "27-40123456-3",
            "fecha-nacimiento": "2004-08-15",
            "carrera": "Ingeniería Química",
            "telefono": 3564401234,
            "email": "maria.gomez@example.com",
            "domicilio": "Belgrano 123"
        },
        {
            "legajo": 10002,
            "nombre": "Luis",
            "apellido": "Fernández",
            "cuil": "20-40234567-8",
            "fecha-nacimiento": "2003-11-22",
            "carrera": "Ingeniería Electrónica",
            "telefono": 3564402345,
            "email": "luis.fernandez@example.com",
            "domicilio": "San Martín 456"
        },
        {
            "legajo": 10003,
            "nombre": "Carla",
            "apellido": "Ramírez",
            "cuil": "27-40345678-5",
            "fecha-nacimiento": "2005-03-09",
            "carrera": "Ingeniería Industrial",
            "telefono": 3564403456,
            "email": "carla.ramirez@example.com",
            "domicilio": "Mitre 789"
        },
        {
            "legajo": 10004,
            "nombre": "Fernando",
            "apellido": "Alonso",
            "cuil": "20-40456789-1",
            "fecha-nacimiento": "2004-06-27",
            "carrera": "Ingeniería Electromecánica",
            "telefono": 3564404567,
            "email": "fernando.alonso@example.com",
            "domicilio": "Rivadavia 321"
        },
        {
            "legajo": 10005,
            "nombre": "Lucía",
            "apellido": "Benítez",
            "cuil": "27-40567890-4",
            "fecha-nacimiento": "2003-12-30",
            "carrera": "Ingeniería en Sistemas de Información",
            "telefono": 3564405678,
            "email": "lucia.benitez@example.com",
            "domicilio": "Castro Barros 654"
        },
        {
            "legajo": 10006,
            "nombre": "Tomás",
            "apellido": "Medina",
            "cuil": "20-40678901-2",
            "fecha-nacimiento": "2005-01-18",
            "carrera": "Ingeniería Química",
            "telefono": 3564406789,
            "email": "tomas.medina@example.com",
            "domicilio": "Ituzaingó 987"
        }
    ]))

    localStorage.setItem("puestos", JSON.stringify([
        {
            "id": 106,
            "nombre": "Desarrollador Backend Jr.",
            "carrera": "Ingeniería en Sistemas de Información",
            "id-empresa": 11,
            "nombre-empresa": "Global Software Inc"
        },
        {
            "id": 107,
            "nombre": "Asistente de Procesos Químicos",
            "carrera": "Ingeniería Química",
            "id-empresa": 21,
            "nombre-empresa": "ChemSolutions S.A."
        },
        {
            "id": 108,
            "nombre": "Analista de Producción Industrial",
            "carrera": "Ingeniería Industrial",
            "id-empresa": 22,
            "nombre-empresa": "Industrias Nova SRL"
        },
        {
            "id": 109,
            "nombre": "Técnico de Soporte Electrónico",
            "carrera": "Ingeniería Electrónica",
            "id-empresa": 23,
            "nombre-empresa": "ElectroSystems Ltda."
        },
        {
            "id": 110,
            "nombre": "Asistente de Mantenimiento Electromecánico",
            "carrera": "Ingeniería Electromecánica",
            "id-empresa": 24,
            "nombre-empresa": "MecanoTech Corp."
        },
        {
            "id": 111,
            "nombre": "Especialista en Automatización de Procesos",
            "carrera": "Ingeniería Electrónica",
            "id-empresa": 25,
            "nombre-empresa": "Automatix Solutions"
        },
        {
            "id": 112,
            "nombre": "Planificador de Operaciones Industriales",
            "carrera": "Ingeniería Industrial",
            "id-empresa": 26,
            "nombre-empresa": "SmartIndustria Global"
        }
    ]))

    const alumnos = JSON.parse(localStorage.getItem("alumnos"))
    console.log(alumnos)


    return (
        <div className="container">
            <div className="mt-5">
                <Button as={Link} to={"/"}>Volver</Button>
                <h1 className="text-center"><strong>Registrar pasantía</strong></h1>
            </div>
            <Form>
                <Form.Group>
                    <Form.Label>Alumno</Form.Label>
                    <Form.Select defaultValue="">
                        <option value="">Seleccione un alumno</option>
                        {alumnos.map((alumno) =>
                            <option value={alumno.legajo}>{alumno.nombre} {alumno.apellido} ({alumno.carrera})</option>
                        )}
                    </Form.Select>
                </Form.Group>
            </Form>
        </div>
    )
}