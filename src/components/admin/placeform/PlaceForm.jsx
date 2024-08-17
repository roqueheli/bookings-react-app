import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import useForm from '../../../hooks/useForm';
import useFetch from '../../../hooks/useFetch';
import CategoriesSelect from './CategoriesSelect';
import ServicesSelect from './ServicesSelect';
import AddressForm from './AddressForm';
import BasicsForm from './BasicsForm';
import ImagesForm from './ImagesForm';
import RoomsForm from './RoomsForm';
import RRSSForm from './RRSSForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PlaceForm.css';

const initialValues = {
    name: '',
    phone: '',
    email: '',
    location: '',
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
        country: '',
        zip: '',
    },
    placesRRSSs: [{ rrss: { rrssId: '' }, rrssUrl: ''}],
    images: [{ img_url: '' }],
    rooms: [{ name: '', capacity: '' }],
    placeServices: [{ service: { service_id: '', name: '' } }]
};

const PlaceForm = () => {
    const { name, phone, email, category, calification, address, placesRRSSs, images, rooms, placeServices,
            handleChange, handleAddressChange, handleImageChange, handleRoomChange, handleServiceChange,
            addImageField, addRoomField, selectedServices, selectedCategory, handleCategoryChange,
            resetForm, handleRRSSChange, addRRSSField, handleImageUpload, progress } = useForm(initialValues);
    const { status, fetchData } = useFetch();
    const [ showSuccess, setShowSuccess ] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchData(`${import.meta.env.VITE_BASE_URL}/places/save`, "POST", { name, phone, email, category, calification, address, placesRRSSs, images, rooms, placeServices });
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
        <Container className='p-3 mb-3'>
            <h1 className='mb-4'>Crear lugar</h1>
            {showSuccess && (
                <Alert variant={status >= 400 ? "danger" : "success"} onClose={() => setShowSuccess(false)} dismissible>
                    {status >= 400 ? '¡Lugar no creado!' : '¡Lugar creado exitosamente!'}
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <BasicsForm name={name} phone={phone} email={email} handleChange={handleChange} />
                <CategoriesSelect selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} />
                <AddressForm address={address} handleAddressChange={handleAddressChange} />
                <ImagesForm images={images} handleImageChange={handleImageChange} handleImageUpload={handleImageUpload} addImageField={addImageField} />

                <RRSSForm placesRRSSs={placesRRSSs} handleRRSSChange={handleRRSSChange} addRRSSField={addRRSSField} />
                <RoomsForm rooms={rooms} handleRoomChange={handleRoomChange} addRoomField={addRoomField} />
                <ServicesSelect selectedServices={selectedServices} handleServiceChange={handleServiceChange} />

                <Form.Group>
                    <Button className='placeform-button' variant="primary" type="submit">Crear lugar</Button>
                    <Button onClick={() => navigate(-1)} className="btn btn-secondary">Volver</Button>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default PlaceForm;
