import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center d-flex align-items-center justify-content-center" style={{ height: "84vh"}}>
      <Row>
        <Col>
          <h1>404</h1>
          <h2>Página no encontrada</h2>
          <p>Lo sentimos, la página que buscas no existe.</p>
          <Button variant="primary" style={{ color: "#F55376", backgroundColor: "#3DD9EB", borderColor: "#3DD9EB" }} onClick={() => navigate(-1)}>
            Volver al inicio
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
