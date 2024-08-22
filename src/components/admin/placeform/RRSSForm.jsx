import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import RRSSSelect from './RRSSSelect';

const RRSSForm = ({ placesRRSSs, handleRRSSChange, addRRSSField }) => {
  return (
    <>
      <h3 className="mt-4">Redes Sociales</h3>
      {placesRRSSs?.map((social, index) => (
        <Form.Group as={Row} controlId={`formRRSS${index}`} key={index}>
          <Form.Label column sm="2">
            RRSS
          </Form.Label>
          <Col className="mb-2" sm="10">
            <RRSSSelect index={index} placesRRSSs={placesRRSSs} handleRRSSChange={(e) => handleRRSSChange(e, index)} />
          </Col>
          <Form.Label column sm="2">
            Url
          </Form.Label>
          <Col className="mb-2" sm="10">
            <Form.Control
              type="text"
              name="rrssUrl"
              value={social?.rrssUrl}
              onChange={(e) => handleRRSSChange(e, index)}
            />
          </Col>
        </Form.Group>
      ))}
      <Button className="mb-3" variant="secondary" onClick={addRRSSField}>
        Agregar Red Social
      </Button>
    </>
  );
};

export default RRSSForm;
