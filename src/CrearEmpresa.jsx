import { Button, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function CrearEmpresa() {

    const empresas = JSON.parse(localStorage.getItem("empresas")) ?? []

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return
        }

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        empresas.push(data)

        localStorage.setItem("empresas", JSON.stringify(empresas))

        console.log(empresas)

        e.target.reset()
    };

    return (
        <div className="container">
            <div className="mt-5">
                <Button as={Link} to={"/"}>Volver</Button>
                <h1 className="text-center"><strong>Registrar empresa</strong></h1>
            </div>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="razonSocial">
                            <Form.Label>Razón Social</Form.Label>
                            <Form.Control
                                type="text"
                                name="razonSocial"
                                required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="cuit">
                            <Form.Label>CUIT (sin guiones ni espacios)</Form.Label>
                            <Form.Control
                                min="100000000"
                                type="number"
                                name="cuit"
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
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="telefono">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                name="telefono"
                                required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="direccion">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                name="direccion"
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