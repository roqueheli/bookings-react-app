import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PlaceForm.css';
import CategoriesSelect from './CategoriesSelect';
import ServicesSelect from './ServicesSelect';

const initialValues = {
    name: '',
    phone: '',
    email: '',
    calification: 0.0,
    category: { category_id: '', name: '' },
    address: {
        street: '',
        street_num: '',
        department: '',
        comune: '',
        region: '',
        address_type: '',
        city: '',
        country: ''
    },
    images: [{ img_url: '' }],
    rooms: [{ name: '', capacity: '' }],
    placeServices: [{ service: { service_id: '', name: '' } }]
};

const PlaceForm = () => {
    const { place, handleChange, handleAddressChange, handleImageChange, handleRoomChange, handleServiceChange, addImageField, addRoomField, selectedServices, selectedCategory, setSelectedCategory } = useForm(initialValues);
    
    // useEffect(() => {
    //     fetchData(`${import.meta.env.BASE_URL}/services/all`, 'GET');
    //     setServices(data);
    // }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Place to be created:', place);
        // Aquí puedes hacer la llamada a la API para guardar el place
    };  

    return (
        <Container>
            <h1 className='mb-4'>Crear lugar</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="formName">
                    <Form.Label column sm="2">Nombre</Form.Label>
                    <Col sm="10">
                        <Form.Control required type="text" name="name" value={place?.name} onChange={handleChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPhone">
                    <Form.Label column sm="2">Teléfono</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="phone" value={place?.phone} onChange={handleChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formEmail">
                    <Form.Label column sm="2">Email</Form.Label>
                    <Col sm="10">
                        <Form.Control type="email" name="email" value={place?.email} onChange={handleChange} />
                    </Col>
                </Form.Group>

                <CategoriesSelect selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

                <h3 className='mt-4'>Dirección</h3>
                <Form.Group as={Row} controlId="formStreet">
                    <Form.Label column sm="2">Calle</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="street" value={place?.address?.street} onChange={handleAddressChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formStreetNum">
                    <Form.Label column sm="2">Número</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="street_num" value={place?.address?.street_num} onChange={handleAddressChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formDepartment">
                    <Form.Label column sm="2">Departamento</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="department" value={place?.address?.department} onChange={handleAddressChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formComune">
                    <Form.Label column sm="2">Comuna</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="comune" value={place?.address?.comune} onChange={handleAddressChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formRegion">
                    <Form.Label column sm="2">Región</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="region" value={place?.address?.region} onChange={handleAddressChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAddressType">
                    <Form.Label column sm="2">Tipo de dirección</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="address_type" value={place?.address?.address_type} onChange={handleAddressChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCity">
                    <Form.Label column sm="2">Ciudad</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="city" value={place?.address?.city} onChange={handleAddressChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCountry">
                    <Form.Label column sm="2">País</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="country" value={place?.address?.country} onChange={handleAddressChange} />
                    </Col>
                </Form.Group>

                <h3 className='mt-4'>Imágenes</h3>
                {place?.images?.map((image, index) => (
                    <Form.Group as={Row} controlId={`formImage${index}`} key={index}>
                        <Form.Label column sm="2">URL imagen</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" name="img_url" value={image?.img_url} onChange={(e) => handleImageChange(e, index)} />
                        </Col>
                    </Form.Group>
                ))}
                <Button className='mb-3' variant="secondary" onClick={addImageField}>Add Image</Button>

                <h3 className='mt-4'>Habitaciones</h3>
                {place?.rooms?.map((room, index) => (
                    <Form.Group as={Row} controlId={`formRoom${index}`} key={index}>
                        <Form.Label column sm="2">Nombre</Form.Label>
                        <Col className='mb-2' sm="10">
                            <Form.Control type="text" name="name" value={room?.name} onChange={(e) => handleRoomChange(e, index)} />
                        </Col>
                        <Form.Label column sm="2">Capacidad</Form.Label>
                        <Col className='mb-2' sm="10">
                            <Form.Control type="number" name="capacity" value={room?.capacity} onChange={(e) => handleRoomChange(e, index)} />
                        </Col>
                    </Form.Group>
                ))}
                <Button className='mb-3' variant="secondary" onClick={addRoomField}>Agregar habitación</Button>
                
                <ServicesSelect selectedServices={selectedServices} handleServiceChange={handleServiceChange} />

                <Form.Group>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>Crear lugar</Button>
                    <Link to="/admin" className="btn btn-secondary">Volver</Link>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default PlaceForm;
