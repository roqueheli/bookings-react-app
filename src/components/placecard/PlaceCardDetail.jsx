import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {Card, Container, Row, Col, ListGroup, Button, Image, Carousel, } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import Loader from "../loader/Loader";

const PlaceCardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, fetchData } = useFetch();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_BASE_URL}/places/${id}`, "GET");
  }, []);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  if (isLoading) {
    return <Loader />;
  }

  const images = data.images || [];
  const thumbnails = images
    .filter((_, index) => index !== selectedImageIndex)
    .slice(0, 4);

  return (
    <Container className="mt-3 mb-5">
      <Row className="align-items-center">
        <Col md={8}>
          <h3>{data.name}</h3>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Carousel activeIndex={selectedImageIndex} onSelect={(selectedIndex) => setSelectedImageIndex(selectedIndex)}>
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <div style={{ width: "100%", height: "400px", overflow: "hidden", position: "relative", }}>
                  <Image
                    src={image.img_url}
                    alt={`Slide ${index + 1}`}
                    fluid
                    style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0, }} />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <p className="mt-4">{data.description}</p>
        </Col>
        <Col md={4}>
          <Row>
            {thumbnails.map((image, index) => (
              <Col key={index} xs={6} className="mb-3">
                <Image
                  src={image.img_url}
                  alt={`Thumbnail ${index + 1}`}
                  fluid
                  thumbnail
                  onClick={() => handleThumbnailClick(images.indexOf(image))}
                  style={{ cursor: "pointer", width: "200px", height: "193px", objectFit: "cover", }} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Card>
            <Card.Body style={{ width: "100%" }}>
              <Card.Title>Details</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>Location: {data.location}</ListGroup.Item>
                <ListGroup.Item>Rating: {data.rating}</ListGroup.Item>
                <ListGroup.Item>Price: ${data.rooms[0].price}/night</ListGroup.Item>
              </ListGroup>
              <Col md={4} className="d-flex justify-content-between" style={{width: "100%"}}>
                <Button variant="primary" className="mt-3">
                  Book Now
                </Button>
                <Button variant="secondary" className="mt-3" onClick={() => navigate(-1)}>
                  Volver
                </Button>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceCardDetail;
