import React, { useEffect, useState } from "react";
import { Table, Button, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Loader from "../../loader/Loader";
import UserRegister from "../../user/UserRegister";
import { useAuth } from "../../../context/AuthContext";
import "./UserList.css";

const UserList = () => {
  const { data, isLoading, fetchData } = useFetch();
  const [show, setShow] = useState(false);
  const { authToken } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_BASE_URL}/users/all`, "GET", null, authToken);
  }, [authToken]);

  const handleClose = () => setShow(false);

  const handleShow = (userId) => {
    setSelectedUser(userId);
    setShow(true);
  };

  const confirmDelete = () => {
    onDelete(selectedUser.id);
    handleClose();
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  const handleAddNew = () => {
    navigate("/admin/add-user");
  };

  const handleUserUpdated = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchData(`${import.meta.env.VITE_BASE_URL}/users/all`, "GET"); // Refrescar la lista de lugares
    
    handleFormClose(); // Cerrar el formulario
  };

  return (
    <>
      <Container style={{ height: "85vh" }}>
        <h2 className="my-4">Lista de Usuarios</h2>
        <Button
          variant="primary"
          className="mb-3 userlist-btn"
          onClick={handleAddNew}>
          Agregar nuevo usuario
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
              {data?.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.name}</td>
                  <td>{user.location}</td>
                  <td>{user.calification}</td>
                  <td>
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => handleEdit(user)}>
                      Modificar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleShow(user.user_id)}>
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
        <Modal show={showForm} onHide={handleFormClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedUser?.user_id ? 'Modificar Lugar' : 'Agregar Nuevo Lugar'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserRegister
              user={selectedUser}
              handleFormClose={handleFormClose}
              isEditMode={true}
              onUserUpdated={handleUserUpdated} />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default UserList;
