import React from "react";
import { Col, Form, Row } from "react-bootstrap";

const BasicsForm = ({name, phone, email, handleChange}) => {
  return (
    <>
      <Form.Group as={Row} controlId="formName">
        <Form.Label column sm="2">
          Nombre
        </Form.Label>
        <Col sm="10">
          <Form.Control
            required
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPhone">
        <Form.Label column sm="2">
          Teléfono
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="phone"
            value={phone}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formEmail">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </>
  );
};

export default BasicsForm;
