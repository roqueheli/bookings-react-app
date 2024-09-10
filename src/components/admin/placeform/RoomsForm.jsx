import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

const RoomsForm = ({ rooms, handleRoomChange, addRoomField }) => {
  return (
    <>
      <h3 className="mt-4">Habitaciones</h3>
      {rooms?.map((room, index) => (
        <Form.Group as={Row} controlId={`formRoom${index}`} key={index}>
          <Form.Label column sm="2">
            Nombre
          </Form.Label>
          <Col className="mb-2" sm="10">
            <Form.Control
              type="text"
              name="name"
              value={room?.name}
              onChange={(e) => handleRoomChange(e, index)}
            />
          </Col>
          <Form.Label column sm="2">
            Capacidad
          </Form.Label>
          <Col className="mb-2" sm="10">
            <Form.Control
              type="number"
              className="no-spin-input"
              name="capacity"
              value={room?.capacity}
              onChange={(e) => handleRoomChange(e, index)}
            />
          </Col>
          <Form.Label column sm="2">
            Price
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="number"
              className="no-spin-input"
              name="price"
              value={room?.price}
              onChange={(e) => handleRoomChange(e, index)}
            />
          </Col>
        </Form.Group>
      ))}
      <Button className="mb-3" variant="secondary" onClick={addRoomField}>
        Agregar habitación
      </Button>
    </>
  );
};

export default RoomsForm;
