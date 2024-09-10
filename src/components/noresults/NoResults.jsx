import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const NoResults = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '75vh' }}>
      <Row>
        <Col className="text-center">
          <h3>No results found</h3>
          <p>Try adjusting your search or filter to find what you're looking for.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default NoResults;
