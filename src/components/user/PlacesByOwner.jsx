import React, { useEffect } from "react";
import { Accordion, Col, Form } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import Loader from "../loader/Loader";

const PlacesByOwner = ({ user, owner, handlePlacesChange, selectedPlaces }) => {
  const { data, isLoading, fetchData } = useFetch();
  
  useEffect(() => {
    fetchData(`${import.meta.env.VITE_BASE_URL}/user-places/user/${user.owner_id || owner}`, "GET", null, user.token);
  }, []);

  const handleChange = (e) => {
    const selectedOptions = Array.from(e.target.options)  // Aquí obtenemos todas las opciones
      .filter(option => option.selected)  // Filtramos solo las que están seleccionadas
      .map(option => option.value);  // Obtenemos los valores de las opciones seleccionadas
    
    handlePlacesChange(selectedOptions); // Pasamos los IDs seleccionados al handler
  };

  return (
    isLoading ? <Loader /> :
    (<Col md={6}>
      <Form.Label>Lugares</Form.Label>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Lugares</Accordion.Header>
          <Accordion.Body>
            <Form.Group>
              <Form.Select
                className="custom-select-multiple"
                multiple
                value={selectedPlaces}
                onChange={handleChange}>
                {data?.map((place) => (
                  <option key={place?.place.place_id} value={place?.place.place_id}>
                    {place?.place.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Col>)
  );
};

export default PlacesByOwner;
