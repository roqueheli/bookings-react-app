import React from "react";
import { Form, Col, Row } from "react-bootstrap";

const AddressForm = ({ address, handleAddressChange }) => {
  return (
    <>
      <h3 className="mt-4">Dirección</h3>
      <Form.Group as={Row} controlId="formStreet">
        <Form.Label column sm="2">
          Calle
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="street"
            value={address?.street}
            onChange={handleAddressChange}
            required
          />
        </Col>
        <Form.Control.Feedback type="invalid">Este campo es obligatorio.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Row} controlId="formStreetNum">
        <Form.Label column sm="2">
          Número
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="streetNum"
            value={address?.streetNum}
            onChange={handleAddressChange}
            required
          />
        </Col>
        <Form.Control.Feedback type="invalid">Este campo es obligatorio.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Row} controlId="formDepartment">
        <Form.Label column sm="2">
          Departamento
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="department"
            value={address?.department}
            onChange={handleAddressChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formComune">
        <Form.Label column sm="2">
          Comuna
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="comune"
            value={address?.comune}
            onChange={handleAddressChange}
            required
          />
        </Col>
        <Form.Control.Feedback type="invalid">Este campo es obligatorio.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Row} controlId="formRegion">
        <Form.Label column sm="2">
          Región
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="region"
            value={address?.region}
            onChange={handleAddressChange}
            required
          />
        </Col>
        <Form.Control.Feedback type="invalid">Este campo es obligatorio.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Row} controlId="formCity">
        <Form.Label column sm="2">
          Ciudad
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="city"
            value={address?.city}
            onChange={handleAddressChange}
            required
          />
        </Col>
        <Form.Control.Feedback type="invalid">Este campo es obligatorio.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Row} controlId="formCountry">
        <Form.Label column sm="2">
          País
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="country"
            value={address?.country}
            onChange={handleAddressChange}
            required
          />
        </Col>
        <Form.Control.Feedback type="invalid">Este campo es obligatorio.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Row} controlId="formZip">
        <Form.Label column sm="2">
          Código Postal
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="number"
            className="no-spin-input"
            name="zip"
            value={address?.zip}
            onChange={handleAddressChange}
            required
          />
        </Col>
        <Form.Control.Feedback type="invalid">Este campo es obligatorio.</Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

export default AddressForm;
