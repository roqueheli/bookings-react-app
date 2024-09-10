import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import './PlaceCard.css';

const PlaceCard = ({ place }) => {

  // Formateo de precio
  const formattedPrice = place?.rooms[0]?.price.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  });

  return (
    <Link to={`/place/${place?.place_id}`} style={{ textDecoration: 'none' }}>
      <Card className="mb-4 shadow-sm" style={{ cursor: 'pointer' }}>
        <Card.Img
          variant="top"
          src={place.images[0]?.img_url}
          alt={place.name}
          className="card-image" />
        <Card.Body>
          <Card.Title>{place?.name}</Card.Title>
          <Card.Text>{place?.description}</Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted">{place?.location}</small>
            </div>
            <div>
              <small className="text-muted">Rating: {place?.rating}</small>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <small className="price-text"><b>{formattedPrice}</b>/noche</small>
            <Button className="btn-sm" variant="primary">Reserva</Button>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default PlaceCard;
