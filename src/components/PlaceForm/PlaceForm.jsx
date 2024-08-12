import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import CategoriesSelect from './CategoriesSelect';
import ServicesSelect from './ServicesSelect';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PlaceForm.css';

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
        address_type: 'PLACE',
        city: '',
        country: ''
    },
    images: [{ img_url: '' }],
    rooms: [{ name: '', capacity: '' }],
    placeServices: [{ service: { service_id: '', name: '' } }]
};

const PlaceForm = () => {
    const { name, phone, email, category, calification, address, images, rooms, placeServices,
            handleChange, handleAddressChange, handleImageChange, handleRoomChange, handleServiceChange,
            addImageField, addRoomField, selectedServices, selectedCategory, handleCategoryChange,
            resetForm, handleImageUpload, progress } = useForm(initialValues);
    const { status, fetchData } = useFetch();
    const [ showSuccess, setShowSuccess ] = useState(false);    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchData(`${import.meta.env.VITE_BASE_URL}/places/save`, "POST", { name, phone, email, category, calification, address, images, rooms, placeServices });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (status === 200) {
            setShowSuccess(true);
            resetForm();
        } else if (status >= 400){
            setShowSuccess(true);
        }
    }, [status]);

    return (
        <Container>
            <h1 className='mb-4'>Crear lugar</h1>
            {showSuccess && (
                <Alert variant={status >= 400 ? "danger" : "success"} onClose={() => setShowSuccess(false)} dismissible>
                    {status >= 400 ? '¡Lugar no creado!' : '¡Lugar creado exitosamente!'}
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="formName">
                    <Form.Label column sm="2">Nombre</Form.Label>
                    <Col sm="10">
                        <Form.Control required type="text" name="name" value={name} onChange={handleChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPhone">
                    <Form.Label column sm="2">Teléfono</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="phone" value={phone} onChange={handleChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formEmail">
                    <Form.Label column sm="2">Email</Form.Label>
                    <Col sm="10">
                        <Form.Control type="email" name="email" value={email} onChange={handleChange} />
                    </Col>
                </Form.Group>

                <CategoriesSelect selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} />

                <h3 className='mt-4'>Dirección</h3>
                <Form.Group as={Row} controlId="formStreet">
                    <Form.Label column sm="2">Calle</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="street" value={address?.street} onChange={handleAddressChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formStreetNum">
                    <Form.Label column sm="2">Número</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="street_num" value={address?.street_num} onChange={handleAddressChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formDepartment">
                    <Form.Label column sm="2">Departamento</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="department" value={address?.department} onChange={handleAddressChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formComune">
                    <Form.Label column sm="2">Comuna</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="comune" value={address?.comune} onChange={handleAddressChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formRegion">
                    <Form.Label column sm="2">Región</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="region" value={address?.region} onChange={handleAddressChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCity">
                    <Form.Label column sm="2">Ciudad</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="city" value={address?.city} onChange={handleAddressChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCountry">
                    <Form.Label column sm="2">País</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="country" value={address?.country} onChange={handleAddressChange} />
                    </Col>
                </Form.Group>

                <h3 className='mt-4'>Imágenes</h3>
                {images?.map((image, index) => (
                    <Form.Group as={Row} controlId={`formImage${index}`} key={index}>
                        <Form.Label column sm="2">URL imagen</Form.Label>
                        <Col sm="10">
                            <Form.Control className='mb-4' type="text" name="img_url" value={image?.img_url} onChange={(e) => handleImageChange(e, index)} readOnly />
                            <Form.Control type="file" onChange={(e) => handleImageUpload(e, index)} />
                            {(progress > 0 && progress < 100) && <p>Progreso: {progress}%</p>}
                        </Col>
                    </Form.Group>
                ))}
                <Button className='mb-3' variant="secondary" onClick={addImageField}>Add Image</Button>

                <h3 className='mt-4'>Habitaciones</h3>
                {rooms?.map((room, index) => (
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
                    <Button className='placeform-button' variant="primary" type="submit">Crear lugar</Button>
                    <Link to="/admin" className="btn btn-secondary">Volver</Link>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default PlaceForm;
