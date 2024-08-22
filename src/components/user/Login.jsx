import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { login, status } = useAuth();
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (status === 200) {
      history.push('/'); 
    }
  };

  return (
    <>
        <h2 style={{ marginLeft: "1rem", padding: ".5rem", color: "#F55376" }}>Iniciar sesión</h2>
        <Container style={{ height: "73vh", maxWidth: "600px", marginBottom: "1.5rem" }}>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
                className='mb-3'
                type="email"
                placeholder="Ingresa tu email"
                name="email"
                value={loginData?.email}
                onChange={handleChange}
                required />
            </Form.Group>
            <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
                className='mb-3'
                type="password"
                placeholder="Ingresa tu contraseña"
                name="password"
                value={loginData?.password}
                onChange={handleChange}
                required />
            </Form.Group>
            <Form.Group className='mb-3'>
            <Button variant="primary" type="submit" style={{ color: "#F55376", backgroundColor: "#3DD9EB", borderColor: "#3DD9EB" }}>Iniciar sesión</Button>
            <Button onClick={() => navigate(-1)} className="btn btn-secondary bnt-md">Volver</Button>
            </Form.Group>
        </Form>
        </Container>
    </>
  );
};

export default Login;
