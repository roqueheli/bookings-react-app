import React from "react";
import { isMobile } from "react-device-detect";
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from "../../context/AuthContext";

const WebOnlyMessage = () => {
    return (
      <Container style={{ height: '86vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Row>
          <Col className="text-center">
            <h2>Este contenido solo está disponible en la web o tablet.</h2>
          </Col>
        </Row>
      </Container>
    );
};

const LoginIsNeeded = () => {
  return (
    <Container style={{ height: '86vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Row>
        <Col className="text-center">
          <h2>Es necesario estar logueado para acceder a las funciones.</h2>
        </Col>
      </Row>
    </Container>
  );  
}

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (isMobile) {
    return <WebOnlyMessage />;
  }

  if (!isLoggedIn) {
    return <LoginIsNeeded />
  }

  return children;
};

export default ProtectedRoute;
