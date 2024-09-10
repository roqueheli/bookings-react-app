import React, { useEffect, useState } from "react";
import { Table, Button, Container, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import useFetch from "../../../hooks/useFetch";
import Loader from "../../loader/Loader";
import NoResults from "../../noresults/NoResults";
import "./UserList.css";
import UserRegister from "../../user/UserRegister";

const UserList = () => {
  const { data, isLoading, fetchData } = useFetch();
  const [ show, setShow ] = useState(false);
  const { user } = useAuth();
  const [ selectedUser, setSelectedUser ] = useState(null);
  const [ showForm, setShowForm ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchData(`${import.meta.env.VITE_BASE_URL}/users/byowner/${user.id}`, "GET", null, user.token);
  }, [user.token]);

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
    navigate("/admin/add-users");
  };

  const handleUserUpdated = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchData(`${import.meta.env.VITE_BASE_URL}/users/byowner/${user.id}`, "GET", null, user.token);
    
    handleFormClose();
  };

  const filteredUsers = data?.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.document.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Container style={{ height: "73vh" }}>
        <h2 className="my-4">Lista de usuarios</h2>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Button
            variant="primary" className="mb-3 userlist-btn" onClick={handleAddNew}>
            Agregar nuevo usuario
          </Button>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre, documento, email o phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3 search-field" />
        </div>
        {isLoading ? (
          <Loader />
        ) : !filteredUsers || filteredUsers.length === 0 ? (
          <NoResults />
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Documento</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.name}</td>
                  <td>{user.document}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
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
        <Modal show={showForm} onHide={handleFormClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>{selectedUser?.user_id ? 'Modificar usuario' : 'Agregar nuevo usuario'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserRegister
              userUpdated={{...selectedUser, token: user.token}}
              owner={user.id}
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
