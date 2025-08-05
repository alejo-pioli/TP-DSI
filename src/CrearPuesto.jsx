import { Button, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function CrearPuesto() {

    const empresas = JSON.parse(localStorage.getItem("empresas")) ?? []

    const puestos = JSON.parse(localStorage.getItem("puestos")) ?? []

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return
        }

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        puestos.push(data)

        localStorage.setItem("puestos", JSON.stringify(puestos))

        e.target.reset()
    };

    return (
        <div className="container">
            <div className="mt-5">
                <Button as={Link} to={"/"}>Volver</Button>
                <h1 className="text-center"><strong>Registrar puesto</strong></h1>
            </div>
            <Form onSubmit={handleSubmit} autoComplete='off'>

                <Form.Group className="mb-3" controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        required />
                </Form.Group>

                <Form.Group controlId="empresa" className="mb-3">
                    <Form.Label>Empresa</Form.Label>
                    <Form.Select defaultValue="" name="empresa" required>
                        <option disabled value="">Seleccione una empresa</option>
                        {empresas.map((empresa) =>
                            <option value={empresa.id}>{empresa.razonSocial}</option>
                        )}
                    </Form.Select>
                </Form.Group>

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