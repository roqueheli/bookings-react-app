import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import Loader from '../loader/Loader';

const Login = () => {
  const [ showSuccess, setShowSuccess ] = useState(false);
  const [ showText, setShowText ] = useState({ text: "", variant: ""});
  const [ loginSuccess, setLoginSuccess ] = useState(null)
  const [ loginData, setLoginData ] = useState({ email: '', password: '' });
  const [ isLoading, setIsLoading ] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    if (loginSuccess !== null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (loginSuccess) {
        setShowText({ text: `Usuario creado exitosamente.`, variant: "success" });
      } else {
        setShowText({ text: `Usuario no creado.`, variant: "danger" });
      }
      setShowSuccess(true);
    }
  }, [loginSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await login(loginData?.email, loginData?.password);
    setIsLoading(false);

    if (result.success) {
      setLoginSuccess(true);
      if (location.pathname === '/admin/user/login') {
        navigate('/admin');  
      } else {
        navigate('/');
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoginData({ email: '', password: '' })
      setShowText({ text: `El correo o la contraseña son incorrectos.`, variant: "danger" });
      setShowSuccess(true);
    }
  };

  return (
    <>
        <h2 style={{ marginLeft: "1rem", padding: ".5rem", color: "#F55376" }}>Iniciar sesión</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <Container style={{ height: "73vh", maxWidth: "600px", marginBottom: "1.5rem" }}>
            {showSuccess && (
              <Alert variant={showText.variant} onClose={() => setShowSuccess(false)} dismissible>
                  {showText.text}
              </Alert>
            )}
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
        )}
    </>
  );
};

export default Login;
