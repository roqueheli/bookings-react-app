import React, { useEffect } from "react";
import { Form, Accordion } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";

const ServicesSelect = ({ selectedServices, handleServiceChange }) => {
  const { data, isLoading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_BASE_URL}/services/all`, "GET");
  }, []);

  return (
    <>
      <h3 className="mt-4">Servicios</h3>
      <Accordion className="mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Seleccione uno o más servicios</Accordion.Header>
          <Accordion.Body>
            <Form.Group>
              <Form.Select
                className="custom-select-multiple"
                multiple
                value={selectedServices}
                onChange={(e) => handleServiceChange(e)}>
                {data?.map((service) => (
                  <option key={service?.service_id} value={service?.service_id}>
                    {service?.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default ServicesSelect;
