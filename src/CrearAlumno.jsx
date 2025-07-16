import { Button, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function CrearAlumno() {

    const alumnos = JSON.parse(localStorage.getItem("alumnos")) ?? []

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return
        }

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        alumnos.push(data)

        localStorage.setItem("alumnos", JSON.stringify(alumnos))

        console.log(alumnos)

        e.target.reset()
    };

    return (
        <div className="container">
            <div className="mt-5">
                <Button as={Link} to={"/"}>Volver</Button>
                <h1 className="text-center"><strong>Registrar pasantía</strong></h1>
            </div>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="nombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="apellido">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="apellido"
                                required />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="legajo">
                            <Form.Label>Legajo</Form.Label>
                            <Form.Control
                                max="100000"
                                type="number"
                                name="legajo"
                                required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="cuil">
                            <Form.Label>CUIL (sin guiones ni espacios)</Form.Label>
                            <Form.Control
                                min="100000000"
                                type="number"
                                name="cuil"
                                required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="fechaNacimiento">
                            <Form.Label>Fecha de nacimiento</Form.Label>
                            <Form.Control
                                type="date"
                                name="fechaNacimiento"
                                required />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="career">
                            <Form.Label>Carrera</Form.Label>
                            <Form.Select
                                name="carrera"
                                defaultValue=""
                                required>
                                <option disabled value="">Seleccione carrera...</option>
                                <option value="Ingeniería en Sistemas de Información">Ingeniería en Sistemas de Información</option>
                                <option value="Ingeniería Química">Ingeniería Química</option>
                                <option value="Ingeniería Electrónica">Ingeniería Electrónica</option>
                                <option value="Ingeniería Electromecánica">Ingeniería Electromecánica</option>
                                <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="telefono">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                name="telefono"
                                required />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="domicilio">
                            <Form.Label>Domicilio</Form.Label>
                            <Form.Control
                                type="text"
                                name="domicilio"
                                required />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>
        </div>
    )
}