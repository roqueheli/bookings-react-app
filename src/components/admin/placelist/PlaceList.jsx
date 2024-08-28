import React, { useEffect, useState } from "react";
import { Table, Button, Container, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Loader from "../../loader/Loader";
import PlaceForm from "../placeform/PlaceForm";
import "./PlaceList.css";
import { useAuth } from "../../../context/AuthContext";

const PlaceList = () => {
  const { data, isLoading, fetchData } = useFetch();
  const [ show, setShow ] = useState(false);
  const { user } = useAuth();
  const [ selectedPlace, setSelectedPlace ] = useState(null);
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ showForm, setShowForm ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_BASE_URL}/places/byowner/${user.id}`, "GET", null, user.token);
  }, [user.token]);

  const handleClose = () => setShow(false);

  const handleShow = (placeId) => {
    setSelectedPlace(placeId);
    setShow(true);
  };

  const confirmDelete = () => {
    onDelete(selectedPlace.id);
    handleClose();
  };

  const handleEdit = (place) => {
    setSelectedPlace(place);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedPlace(null);
  };

  const handleAddNew = () => {
    navigate("/admin/add-place");
  };

  const handlePlaceUpdated = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchData(`${import.meta.env.VITE_BASE_URL}/places/byowner/${user.id}`, "GET", null, user.token); // Refrescar la lista de lugares
    
    handleFormClose(); // Cerrar el formulario
  };

  const filteredPlaces = data?.filter((place) => {
    return (
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Container style={{ height: "73vh" }}>
        <h2 className="my-4">Lista de Lugares</h2>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Button variant="primary" className="mb-3 placelist-btn" onClick={handleAddNew}>
            Agregar nuevo lugar
          </Button>
          <Form.Control
              type="text"
              placeholder="Buscar por nombre, email o phone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-3 search-field" />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Ubicación</th>
                <th>Calificación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlaces?.map((place) => (
                <tr key={place.place_id}>
                  <td>{place.place_id}</td>
                  <td>{place.name}</td>
                  <td>{place.location}</td>
                  <td>{place.calification}</td>
                  <td>
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => handleEdit(place)}>
                      Modificar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleShow(place.place_id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
      <div className="text-right button-back">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este lugar?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>No</Button>
          <Button variant="danger" onClick={confirmDelete}>Sí, eliminar</Button>
        </Modal.Footer>
      </Modal>
      {(showForm && !isLoading) && (
        <Modal show={showForm} onHide={handleFormClose} size="xl" className="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>{selectedPlace?.place_id ? 'Modificar Lugar' : 'Agregar Nuevo Lugar'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PlaceForm
              place={selectedPlace}
              handleFormClose={handleFormClose}
              isEditMode={true}
              onPlaceUpdated={handlePlaceUpdated} />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default PlaceList;
