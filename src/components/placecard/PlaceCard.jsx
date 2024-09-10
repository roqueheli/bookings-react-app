import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import SkeletonPlaceCard from "./SkeletonPlaceCard";
import "./PlaceCard.css";

const PlaceCard = ({ place }) => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  // Formateo de precio
  const formattedPrice = place?.rooms[0]?.price.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  });
  
  useEffect(() => {
    const timer = setTimeout(() => {
        setShowSkeleton(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    showSkeleton ? <SkeletonPlaceCard /> :
    <Link to={`/place/${place?.place_id}`} style={{ textDecoration: "none" }}>
      <Card
        className="mb-4 shadow-sm place-card"
        style={{ cursor: "pointer", height: "100%" }}>
        <Card.Img
          variant="top"
          src={`${place.images[0]?.img_url}?t=${new Date().getTime()}`}
          alt={place.name}
          className="card-image"
          style={{ height: "200px", objectFit: "cover" }} />
        <Card.Body className="d-flex flex-column">
          <Card.Title
            className="mb-2"
            style={{ fontSize: "1.25rem", height: "3rem", overflow: "hidden" }}>
            {place?.name}
          </Card.Title>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">{place?.location}</small>
            <small className="text-muted">Rating: {place?.rating}</small>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <small className="price-text"><b>{formattedPrice}</b>/noche</small>
            <Button className="btn-sm" variant="primary">
              Reserva
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default PlaceCard;
