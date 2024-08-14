import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";

const PlaceCardDetail = () => {
  const { id } = useParams();
  const { data, fetchData } = useFetch();

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_BASE_URL}/places/${id}`, "GET");
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <Image src={data.images[0]?.img_url} alt={data.name} fluid />
          <h3 className="mt-4">{data.name}</h3>
          <p>{data.description}</p>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Details</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>Location: {data.location}</ListGroup.Item>
                <ListGroup.Item>Rating: {data.rating}</ListGroup.Item>
                <ListGroup.Item>Price: ${data.price}/night</ListGroup.Item>
              </ListGroup>
              <Button variant="primary" className="mt-3" block>
                Book Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceCardDetail;
