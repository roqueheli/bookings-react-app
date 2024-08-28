import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddressForm from '../placeform/AddressForm';
import PlacesByOwner from '../../user/PlacesByOwner';
import useForm from '../../../hooks/useForm';
import "./UserForm.css";

const UserForm = ({ user, handleFormClose, onUserUpdated }) => {
    const navigate = useNavigate();
    const [ showSuccess, setShowSuccess ] = useState(false);
    const initialValues = {
        user_id: user?.user_id || '',
        name: user?.name || '',
        document: user?.document || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || {
            street: '',
            streetNumber: '',
            apartment: '',
            commune: '',
            region: '',
            city: '',
            country: '',
            postalCode: '',
        },
        userType: user?.userType || '',
        places: user?.selectedPlaces || [],
    };

    const {
        user_id,
        name,
        document,
        email,
        phone,
        address,
        userType,
        places,
        handleChange,
        handleAddressChange,
        handlePlacesChange,
        resetForm
      } = useForm(initialValues);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Container className='m-3'>
            <h2>Crear usuario</h2>
            {showSuccess && (
                <Alert variant={(status >= 400 || isModified) ? "danger" : "success"} onClose={() => setShowSuccess(false)} dismissible>
                    {isModified ? `No se han realizado cambios.` : status >= 400
                        ? `¡Usuario no ${isEditMode ? 'modificado' : 'creado'}!` 
                        : `¡Usuario ${isEditMode ? 'modificado' : 'creado'} exitosamente!`}
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleChange}
                                placeholder="Ingrese nombre" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formDocument">
                            <Form.Label>Documento</Form.Label>
                            <Form.Control
                                type="text"
                                name="document"
                                value={document}
                                onChange={handleChange}
                                placeholder="Ingrese documento" />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="Ingrese email" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={phone}
                                onChange={handleChange}
                                placeholder="Ingrese teléfono" />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formUserType">
                            <Form.Label>Tipo usuario</Form.Label>
                            <Form.Control
                                as="select"
                                name="userType"
                                value={userType}
                                onChange={handleChange}>
                                <option value="" disabled>Seleccione tipo de usuario</option>
                                <option value="1">Owner</option>
                                <option value="2">Admin</option>
                                <option value="3">User</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <PlacesByOwner user_id={user_id} handlePlacesChange={handlePlacesChange} places={places} />
                </Row>

                <Row>
                    <AddressForm address={user?.address} handleAddressChange={handleAddressChange} />
                </Row>

                <Form.Group>
                    <Button className='userform-button' variant="primary" type="submit">
                        {user ? 'Modificar usuario' : 'Crear usario'}
                    </Button>
                    <Button onClick={user ? handleFormClose : () => navigate(-1)} className="btn btn-secondary bnt-md">Volver</Button>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default UserForm;
