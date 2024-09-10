import React from "react";
import { Card, Placeholder } from "react-bootstrap";

const SkeletonPlaceCard = () => {
  return (
    <Card className="mb-4 shadow-sm place-card" style={{ height: '100%' }}>
      <Placeholder as={Card.Img} variant="top" className="card-image" style={{ height: '200px' }} />
      <Card.Body className="d-flex flex-column">
        <Placeholder as={Card.Title} animation="glow" className="mb-2">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as="div" animation="glow" className="mb-2">
          <Placeholder xs={4} /> <Placeholder xs={2} />
        </Placeholder>
        <Placeholder as="div" animation="glow" className="mt-auto d-flex justify-content-between align-items-center">
          <Placeholder xs={4} /> <Placeholder.Button xs={4} variant="primary" />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};

export default SkeletonPlaceCard;
