import React, { useEffect, useState } from "react";
import { Table, Button, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Loader from "../../loader/Loader";
import PlaceForm from "../placeform/PlaceForm";
import "./PlaceList.css";

const PlaceList = () => {
  const { data, isLoading, fetchData } = useFetch();
  const [show, setShow] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_BASE_URL}/places/all`, "GET");
  }, []);

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

  return (
    <>
      <Container style={{ height: "85vh" }}>
        <h2 className="my-4">Lista de Lugares</h2>
        <Button
          variant="primary"
          className="mb-3 placelist-btn"
          onClick={handleAddNew}
        >
          Agregar Nuevo Lugar
        </Button>
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
              {data?.map((place) => (
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
      {showForm && (
        <Modal show={showForm} onHide={handleFormClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedPlace?.place_id ? 'Modificar Lugar' : 'Agregar Nuevo Lugar'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PlaceForm
              place={selectedPlace}
              onClose={handleFormClose}
              onSubmit={(updatedPlace) => {
                // Lógica para actualizar el lugar (PUT request)
                console.log("Lugar actualizado:", updatedPlace);
                handleFormClose();
              }}
              isEditMode={true}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default PlaceList;
