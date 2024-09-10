import React from "react";
import { isMobile } from "react-device-detect";
import { Container, Row, Col } from 'react-bootstrap';

const WebOnlyMessage = () => {
    return (
      <Container style={{ height: '86.7vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Row>
          <Col className="text-center">
            <h2>Este contenido solo está disponible en la web o tablet.</h2>
          </Col>
        </Row>
      </Container>
    );
};

const ProtectedRoute = ({ children }) => {
  if (isMobile) {
    return <WebOnlyMessage />;
  }

  return children;
};

export default ProtectedRoute;
