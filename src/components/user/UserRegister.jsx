import React, { useEffect, useState } from "react";
import { Form, Button, Container, InputGroup, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AddressForm from "../admin/placeform/AddressForm";
import useForm from "../../hooks/useForm";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import './UserRegister.css';

const initialValues = {
  name: "",
  document: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  address: {
    street: '',
    streetNum: '',
    department: '',
    comune: '',
    region: '',
    address_type: 'USER',
    city: '',
    country: '',
    zip: '',
  },
  userType: "USER"
}

const UserRegister = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [ showSuccess, setShowSuccess ] = useState(false);
  const [ registerSuccess, setRegisterSuccess ] = useState(null)
  const [ passwordVisible, setPasswordVisible ] = useState(false);
  const [ passwordLength, setPasswordLength ] = useState(0);
  const [ passwordStrength, setPasswordStrength ] = useState(0);
  const [ showText, setShowText ] = useState({ text: "", variant: ""});
  const {
    name,
    document,
    email,
    phone,
    password,
    confirmPassword,
    address,
    userType,
    handleRegisterChange,
    handleRegisterAddressChange,
    resetForm,
  } = useForm(initialValues);

  useEffect(() => {
    if (registerSuccess !== null) { // Solo mostrar mensajes si se ha intentado registrar
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (registerSuccess) {
        setShowText({ text: `Usuario creado exitosamente.`, variant: "success" });
        resetForm();
      } else {
        setShowText({ text: `Usuario no creado.`, variant: "danger" });
      }
      setShowSuccess(true);
    }
  }, [registerSuccess, resetForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" }); 
    if (password !== confirmPassword) {
      setShowSuccess(true);
      setShowText({ text: `Las contraseñas no coinciden.`, variant: "danger"});
      return;
    }

    // Validar que todos los campos estén completos
    const form = e.target;
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    if(passwordStrength < 2 || password.length < 8) {
      if(passwordStrength < 2) {
        setShowText({ text: `La contraseña debe incluir al menos un caracter especial.`, variant: "danger"});
      } else if (password.length < 8) {
        setShowText({ text: `La longitud mínima para contraseñas es de 8 carácateres.`, variant: "danger"});
      }
      setShowSuccess(true);
      return;
    }

    const result = await register({ name, document, email, phone, password, address, userType });
    if (result.success) {
      setRegisterSuccess(true);
      navigate("/");
    }
  };

  // Efecto para actualizar la complejidad de la contraseña
  useEffect(() => {
    evaluatePasswordStrength(password);
    setPasswordLength(password.length);
  }, [password]);

  // Función para evaluar la complejidad de la contraseña
  const evaluatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(Math.min(strength, 3)); // Limitar a 0-3
  };

  // Calcula el porcentaje basado en la longitud de la contraseña (en 5% por cada carácter)
  const percentage = Math.min(passwordLength * 5, 100);

  // Determina el color de la barra según la fuerza de la contraseña
  const strengthClass = [
    'password-strength-very-weak',
    'password-strength-weak',
    'password-strength-moderate',
    'password-strength-strong'
  ][passwordStrength] || 'password-strength-very-weak';  

  return (
    <>
        <h2 style={{ marginLeft: "1rem", padding: ".5rem", color: "#F55376" }}>Registro de Usuario</h2>
        <Container style={{ maxWidth: "600px", marginBottom: "1.5rem"}}>
          {showSuccess && (
            <Alert variant={showText.variant} onClose={() => setShowSuccess(false)} dismissible>
                {showText.text}
            </Alert>
          )}
          <Form onSubmit={handleSubmit} noValidate>
              <Form.Group controlId="formName" className="mt-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingresa tu nombre"
                    name="name"
                    value={name}
                    onChange={handleRegisterChange}
                    required />
                <Form.Control.Feedback type="invalid">Este campo es obligatorio.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formDocument" className="mt-3">
              <Form.Label>Documento</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingresa tu documento"
                    name="document"
                    value={document}
                    onChange={handleRegisterChange}
                    required />
                <Form.Control.Feedback type="invalid">Este campo es obligatorio.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Ingresa tu email"
                    name="email"
                    value={email}
                    onChange={handleRegisterChange}
                    required />
                <Form.Control.Feedback type="invalid">Este campo es obligatorio.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Contraseña</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    name="password"
                    value={password}
                    onChange={handleRegisterChange}
                    required />
                  <InputGroup.Text onClick={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
                <Form.Control.Feedback type="invalid">Este campo es obligatorio.</Form.Control.Feedback>
                <Form.Text className="text-muted">
                  {password.length > 0 &&                  
                    <div className="password-strength-bar">
                      <div
                        className={`password-strength-fill ${strengthClass}`}
                        style={{ width: `${percentage}%` }} // Ajusta el ancho según la longitud y fuerza
                      />
                    </div>
                  }
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mt-3">
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Confirma tu contraseña"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleRegisterChange}
                  required />
              </Form.Group>

              <Form.Group controlId="formPhone" className="mt-3">
              <Form.Label>Teléfono</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingresa tu teléfono"
                    name="phone"
                    value={phone}
                    onChange={handleRegisterChange}
                    required />
                <Form.Control.Feedback type="invalid">Este campo es obligatorio.</Form.Control.Feedback>
              </Form.Group>

              <AddressForm address={address} handleAddressChange={handleRegisterAddressChange} required />

              <Form.Group className="mt-4">
                <Button variant="primary" type="submit" style={{ color: "#F55376", backgroundColor: "#3DD9EB", borderColor: "#3DD9EB" }}>Registrarse</Button>
                <Button onClick={() => navigate(-1)} className="btn btn-secondary bnt-md">Volver</Button>
              </Form.Group>
          </Form>
        </Container>
    </>
  );
};

export default UserRegister;
