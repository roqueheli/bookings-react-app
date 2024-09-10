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


const PlaceForm = ({ place, isEditMode = false, onClose }) => {
    const initialValues = {
        name: place?.name || '',
        phone: place?.phone || '',
        email: place?.email || '',
        location: place?.location || '',
        calification: place?.calification || 0.0,
        category: place?.category || { category_id: '', name: '' },
        address: place?.address || {
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
        placesRRSSs: place?.placesRRSSs || [{ rrss: { rrssId: '' }, rrssUrl: ''}],
        images: place?.images || [{ img_url: '' }],
        rooms: place?.rooms || [{ name: '', capacity: '' }],
        placeServices: place?.placeServices || [{ service: { service_id: '', name: '' } }]
    };

    const { name, phone, email, category, calification, address, placesRRSSs, images, rooms, placeServices,
            handleChange, handleAddressChange, handleImageChange, handleRoomChange, handleServiceChange,
            addImageField, addRoomField, selectedServices, selectedCategory, handleCategoryChange,
            resetForm, handleRRSSChange, addRRSSField, handleImageUpload, progress, setSelectedCategory,
            selectedRRSS, setSelectedRRSS } = useForm(initialValues);
    const { status, fetchData } = useFetch();
    const [ showSuccess, setShowSuccess ] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = isEditMode ? "PUT" : "POST";
        const url = isEditMode 
            ? `${import.meta.env.VITE_BASE_URL}/places/${place.place_id}` 
            : `${import.meta.env.VITE_BASE_URL}/places/save`;

        await fetchData(url, method, { name, phone, email, category, calification, address, placesRRSSs, images, rooms, placeServices });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (status === 200) {
            setShowSuccess(true);
            if (!isEditMode) {
                resetForm();
            }
        } else if (status >= 400){
            setShowSuccess(true);
        }
    }, [status, isEditMode, place]);

    useEffect(() => {
        if (place) {
          // Cargar los valores iniciales para los campos select
          setSelectedCategory({ target: { value: place.category?.category_id } });
        //   handleServiceChange({
        //     target: { selectedOptions: place.placeServices.map((s) => ({ value: s.service.service_id, text: s.service.name })) },
        //   });
          setSelectedRRSS({
            target: { value: place.placesRRSSs.map((r) => r.rrss.rrssId) },
          });
        }
      }, [place]);
    
    return (
        <Container className='p-3 mb-3'>
            <h1 className='mb-4'>{isEditMode ? "Modificar lugar" : "Crear lugar"}</h1>
            {showSuccess && (
                <Alert variant={status >= 400 ? "danger" : "success"} onClose={() => setShowSuccess(false)} dismissible>
                    {status >= 400
                        ? `¡Lugar no ${isEditMode ? 'modificado' : 'creado'}!` 
                        : `¡Lugar ${isEditMode ? 'modificado' : 'creado'} exitosamente!`}
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <BasicsForm name={name} phone={phone} email={email} handleChange={handleChange} />
                <CategoriesSelect selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} />
                <AddressForm address={address} handleAddressChange={handleAddressChange} />
                <ImagesForm images={images} handleImageChange={handleImageChange} handleImageUpload={handleImageUpload} addImageField={addImageField} progress={progress} />

                <RRSSForm selectedRRSS={selectedRRSS} placesRRSSs={placesRRSSs} handleRRSSChange={handleRRSSChange} addRRSSField={addRRSSField} />
                <RoomsForm rooms={rooms} handleRoomChange={handleRoomChange} addRoomField={addRoomField} />
                <ServicesSelect selectedServices={selectedServices} handleServiceChange={handleServiceChange} />

                <Form.Group>
                    <Button className='placeform-button' variant="primary" type="submit">{isEditMode ? "Modificar" : "Crear lugar"}</Button>
                    <Button onClick={!isEditMode ? () => navigate(-1) : onClose } className="btn btn-secondary bnt-md">Volver</Button>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default PlaceForm;
