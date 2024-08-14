import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import './PlaceCard.css';

const PlaceCard = ({ place }) => {
  return (
    <Link to={`/place/${place?.place_id}`} style={{ textDecoration: 'none' }}>
      <Card className="mb-4 shadow-sm" style={{ cursor: 'pointer' }}>
        <Card.Img
          variant="top"
          src={place.images[0]? place.images[0]?.img_url : "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o="}
          alt={place.name}
          className="card-image" // Agrega la clase para aplicar estilos
        />
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
            <h5>${place?.price}/night</h5>
            <Button variant="primary">Book Now</Button>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default PlaceCard;
