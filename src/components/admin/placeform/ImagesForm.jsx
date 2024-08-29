import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const ImagesForm = ({ images, progress, handleImageChange, handleImageUpload, addImageField }) => {
  return (
    <>
      <h3 className="mt-4">Imágenes</h3>
      {images?.map((image, index) => (
        <Form.Group as={Row} controlId={`formImage${index}`} key={index}>
          <Form.Label column sm="2">
            URL imagen
          </Form.Label>
          <Col sm="10">
            <Form.Control
              className="mb-4"
              type="text"
              name="img_url"
              value={image?.img_url}
              onChange={(e) => handleImageChange(e, index)}
              readOnly
            />
            {/* <Form.Control
              type="file"
              onChange={(e) => handleImageUpload(e, index)}
            />
            {progress > 0 && progress < 100 && <p>Progreso: {progress}%</p>} */}
          </Col>
        </Form.Group>
      ))}
      <Button className="mb-3" variant="secondary" onClick={addImageField}>
        Add Image
      </Button>
    </>
  );
};

export default ImagesForm;
